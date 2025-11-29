const { default: axios } = require('axios')
const HistoricalStack = require('../utils/stack')
const path = require('path')

const goBack = new HistoricalStack()
const goForward = new HistoricalStack()

const browserController = {
    index: (_, res) => {
        const currentPage = goBack.peek()
        const canBack = !goBack.isEmpty()
        const canForward = !goForward.isEmpty()
        
        res.render(path.join(__dirname,'../','template','index.ejs'), {
            page: currentPage,
            canBack,
            canForward
        })
    },

    search: async (req, res) => {
        const {term} = req.body

        // Para testar sem buscador do google comento desta linha
        try {
            const url = `https://www.googleapis.com/customsearch/v1?key=${process.env.GOOGLE_API_KEY}&cx=${process.env.CX}&q=${encodeURIComponent(term)}`

            const response = await axios.get(url)

            const googleData = response.data.items
            
            const formattedResults = googleData.map(item => ({
                title: item.title,
                url: item.link,
                snippet: item.snippet
            }))
            
            const newPage = {
                title: `Resultados de busca para ${term}`,
                content: formattedResults
            }

            goBack.push(newPage)
            goForward.clear()

            res.redirect('/')
        } catch (error) {
            console.log("erro do google: ", error.message)
            res.redirect('/')
        }
        // até esta linha e descomente o bloco comentanado abaixo

        // const response = googleSearchSimulator(term)
        // const newPage = {
        //         title: `Resultados de busca para ${term}`,
        //         content: response
        // }
        // goBack.push(newPage)
        // res.redirect('/')
    },

    back: (_, res) => {
        const page = goBack.pop()

        if (page) {
            goForward.push(page)
        }

        res.redirect('/')
    },

    forward: (_, res) => {
        const page = goForward.pop()

        if (page) {
            goBack.push(page)
        }

        res.redirect('/')
    }
}

/**
 * Função criada para simular busca do google caso você não possua e não queira criar cadastro na plataforma 
 * Google Cloud (https://console.cloud.google.com/), para criar sua chave de API, e criar seu ID do motor de busca
 * (https://programmablesearchengine.google.com/), necessários para funcionamento com buscador Google
 * 
 * Se não quiser seguir os passos descritos acima, basta comentar todo o bloco try catch, que possui a implementação
 * do buscador google, e descomentar a função abaixo (googleSearchSimulator) e também descomentar o bloco comentado
 * dentro da propriedade 'search'.
 * 
 * Com isso o projeto funcionará plenamento, simulando navegação no histórico de buscas através dos botões voltar e 
 * avançar de um navegador web.
 * @param {string} term Busca digitada no Google. 
 */
// function googleSearchSimulator(term) {
//     return [
//         { title: `Definição de ${term}`, snippet: `Aqui está a explicação completa sobre ${term}...` },
//         { title: `Imagens de ${term}`, snippet: `Várias fotos legais de ${term}...` },
//         { title: `Wikipédia: ${term}`, snippet: `Artigo enciclopédico sobre ${term}.` }
//     ];
// }

module.exports = {browserController}
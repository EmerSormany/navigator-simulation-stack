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
        const {search} = req.body

        try {
            const url = `https://www.googleapis.com/customsearch/v1?key=${process.env.GOOGLE_API_KEY}&cx=${process.env.CX}&q=${encodeURIComponent(search)}`

            const response = await axios.get(url)

            const googleData = response.data.items
            
            const formattedResults = googleData.map(item => ({
                title: item.title,
                url: item.link,
                snippet: item.snippet
            }))
            
            const newPage = {
                title: `Resultados de busca para ${search}`,
                url: `https://www.google.com/search?q=${search}`,
                content: formattedResults
            }

            goBack.push(newPage)
            goForward.clear()

            res.redirect('/')
        } catch (error) {
            console.log("erro do google: ", error.message);
            res.redirect('/')
        }
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

//Função criada para simular buscar no google antes de implementar a busca de fato
// por questões de gasto com API a função será mantida comentada para ser utilizada novamente, se necessário
// function googleSearchSimulator(search) {
//     return [
//         { title: `Definição de ${search}`, snippet: `Aqui está a explicação completa sobre ${search}...` },
//         { title: `Imagens de ${search}`, snippet: `Várias fotos legais de ${search}...` },
//         { title: `Wikipédia: ${search}`, snippet: `Artigo enciclopédico sobre ${search}.` }
//     ];
// }

module.exports = {browserController}
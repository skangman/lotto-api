const axios = require("axios");
const cheerio = require('cheerio')




async function PromiseTimeout(delayms) {
    return new Promise(function (resolve, reject) {
        setTimeout(resolve, delayms);
    });
}


async function getLotto(date) {

    const url = "https://news.sanook.com/lotto/check/" + date + "/";
    // let newdate = '01112566';
    // const url = "https://news.sanook.com/lotto/check/" + newdate + "/";
    console.log(url);

    const axo = axios(url)
        .then(response => {
            const html = response.data
            const $ = cheerio.load(html)
            const articles = []

            // https://news.sanook.com/lotto/check/01112566/

            $('.lotto__number', html).each(function (i) { //<-- cannot be a function expression
                const number = $(this).text()
                articles.push({
                    order: i + 1,
                    number: number
                })
                /* const url = $(this).find('a').attr('href')
                 articles.push({
                     title,
                     url
                 })*/
            })

            /*$('.fc-item__title', html).each(function () { //<-- cannot be a function expression
                const title = $(this).text()
                const url = $(this).find('a').attr('href')
                articles.push({
                    title,
                    url
                })
            })*/
            return articles;
        }).catch(err => console.log(err))

    return axo;

}

exports.LottoApi = async (req, res, next) => {

    var date_input = await req.params.date;


    const d = new Date();

    var mm = d.getMonth() + 1;
    var dd = d.getDate();
    var yy = '';

    if (!date_input) {

        if (dd < 15) {
            dd = Number("01");
        } else {
            dd = Number("16");
        }




        if (mm < 10) mm = '0' + mm;
        if (dd < 10) dd = '0' + dd;

        date_input = dd + '' + mm + '' + d.getFullYear();

        console.log(date_input);
    } else {

        dd = date_input[0] + "" + date_input[1];
        mm = parseInt(date_input[2] + "" + date_input[3]);
        yy = date_input[4] + "" + date_input[5] + "" + date_input[6] + "" + date_input[7];

        if (yy > d.getFullYear()) {
            yy = d.getFullYear();
        }

        if (dd < 15) {
            dd = Number("01");
        } else {
            dd = Number("16");
        }




        if (mm < 10) mm = '0' + mm;
        if (dd < 10) dd = '0' + dd;

        date_input = dd + '' + mm + '' + parseInt(yy + 543);

    }

    const data = await getLotto(date_input);
    res.json(data);


}


exports.HolidayApi = async (req, res, next) => {

    var data_array = await dbQuery("select * from setting_holiday_tbl");
    res.json(data_array);

}


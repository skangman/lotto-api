const axios = require("axios");
const cheerio = require('cheerio')

// const express = require('express');
// const app = express();
// app.use(express.json());


async function PromiseTimeout(delayms) {
    return new Promise(function (resolve, reject) {
        setTimeout(resolve, delayms);
    });
}


async function getLotto(date, inputNumber) {

    const url = "https://news.sanook.com/lotto/check/" + date + "/";

    const axo = axios(url).then(response => {
        const html = response.data
        const $ = cheerio.load(html)
        const articles = []

        // https://news.sanook.com/lotto/check/01112566/
        const getNumber = inputNumber;

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


        // const resulte = !!articles.find(item => {
        //    return item.number === getNumber;
        // })

        // const resulte = articles.filter(it => it.number === getNumber);
        if (getNumber) {
            const reCheck = articles.filter(item => getNumber.includes(item.number));

            console.log(reCheck);
            resulte = reCheck;
        } else {
            resulte = [];
        }



        return ({ articles: articles, arr: resulte });
    }).catch(err => console.log(err))

    return axo;

}

exports.LottoApi = async (req, res, next) => {

    var date_input = await req.params.date;
    var inputNumber = await req.params.inputNumber;

    const d = new Date();

    var mm = d.getMonth() + 1;
    var dd = d.getDate();
    var yy = '';

    if (!date_input) { //ไม่ได้กรอกวันที่

        if (dd < 15) {
            dd = Number("01");
        } else {
            dd = Number("16");
        }




        if (mm < 10) mm = '0' + mm;
        if (dd < 10) dd = '0' + dd;

        date_input = dd + '' + mm + '' + d.getFullYear();
        console.log('No-input-date:' + date_input);

    } else { //กรอกวันที่

        dd = date_input[0] + "" + date_input[1];
        mm = parseInt(date_input[2] + "" + date_input[3]);
        yy = date_input[4] + "" + date_input[5] + "" + date_input[6] + "" + date_input[7];

        if (yy > d.getFullYear()) {
            yy = d.getFullYear();
        }

        // if (dd < 15) {
        //     dd = Number("01");
        // } else {
        //     dd = Number("16");
        // }




        if (mm < 10) mm = '0' + mm;
        if (dd < 10) dd = '' + dd;

        date_input = dd + '' + mm + '' + parseInt(yy + 543);
        console.log('input-date:' + date_input);
    }

    const data = await getLotto(date_input, inputNumber);
    res.json(data);


}


exports.HolidayApi = async (req, res, next) => {

    // var data_array = await dbQuery("select * from setting_holiday_tbl");
    // res.json(data_array);

}



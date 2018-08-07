/**
 * @name SearchService.js
 * @desc
 * @author: Created by XuYong of1615 on 2018/7/30
 */

'use strict';

const Service = require('egg').Service;
const cheerio = require('cheerio');

class SearchService extends Service {

  async searchServiceByLogin() {

    return null;
  }

  async searchServiceByNotLogin() {

    return null;
  }

  async searchServiceByPage(pageIndex, pageSize = '20') {
    const ctx = this.ctx;
    console.log('SearchService.js--1 --searchServiceByPage()--1');

    try {
      const topic = `https://api.readhub.cn/topic?lastCursor=${pageIndex}&pageSize=${pageSize}`;
      const result = await ctx.curl(topic, {
        dataType: 'json',
      });
      if (result.status === 200) {
        console.log('SearchService.js--2 --searchServiceByPage()--2 --result:', result);
        console.log('SearchService.js--3 --searchServiceByPage()--3 --result.data:', result.data);
        return result.data;
      }
      return [];
    } catch (error) {
      this.logger.error(error);
      return [];
    }
  }

  // 天眼查
  async searchServiceByTYC() {
    const ctx = this.ctx;
    const tempUrl = 'https://www.tianyancha.com';

    try {
      // const topic = `https://api.readhub.cn/topic?lastCursor=${53058}&pageSize=${20}`;
      // const topic = 'https://www.tianyancha.com/search?key=%E8%8B%8F%E5%AE%81%E6%98%93%E8%B4%AD';// key=苏宁易购
      const topic = `${tempUrl}/search?key=%E8%8B%8F%E5%AE%81%E6%98%93%E8%B4%AD`;// key=苏宁易购

      const result = await ctx.curl(topic, {
        // dataType: 'json',
        // dataType: 'html',
        dataType: 'text',
      });

      const tempHtml = result.data;
      let resultData = [];
      // resultData = result.res;
      resultData = result.data;

      const $ = cheerio.load(tempHtml);
      let companyList = [], companyInfo = {};
      companyList.push({});

      // console.log('searchServiceByTYC()--5.0 --$(\'.name select-none\'):\n', `${$('.name select-none').text()}\n`);

      // console.log('searchServiceByTYC()--6.0 --$(\'.tyc-num lh24\'):\n', $('.tyc-num lh24').text());
      // console.log('searchServiceByTYC()--6.1 --$(\'.tyc-num lh24\'):\n', $('.tyc-num lh24').html());
      // console.log('searchServiceByTYC()--6.2 --$(\'.tyc-num lh24\'):\n', $('.tyc-num lh24'));


      // // console.log('searchServiceByTYC()--7.0 --$(\'.result-list\'):\n', $('.result-list'));
      // // $('.result-list').toArray().map((value, index) => console.log('searchServiceByTYC()--7 --index:', index, ', value:', value));
      // $('.result-list').toArray().map((value, index) => {
      //   // console.log('searchServiceByTYC()--7.1.1 --index:', index, ' ----****----start----****----\n');
      //   // // console.log('searchServiceByTYC()--7.1.2 --index:', index, ', value:\n', value);
      //   // console.log('searchServiceByTYC()--7.1.3 --index:', index, ', value.children:\n', value.children);
      //   // console.log('searchServiceByTYC()--7.1.9 --index:', index, ' ----****----end----****----\n');
      //
      //   if (value.children) {
      //     value.children.map((item, index) => {
      //       if (item.children && item.attribs['data-id'] === '3151725787') {
      //         console.log('searchServiceByTYC()--7.2.1 --index:', index, ' ----****----start----****----\n');
      //         // console.log('searchServiceByTYC()--7.2.1 --index:', index, ', companyName:', item.children[1].children[1].children[0].children[0].children[0]);
      //         // console.log('searchServiceByTYC()--7.2.2 --index:', index, ', companyName:', item.children[1].children[1].children[0].children[0]);
      //         // console.log('searchServiceByTYC()--7.2.3 --index:', index, ', companyName:', item.children[1].children[0].children[0].children[0]);
      //         console.log('searchServiceByTYC()--7.2.4 --index:', index, ', companyName:', item.children[1].children[0].children[0].children[0].children);
      //         console.log('searchServiceByTYC()--7.2.9 --index:', index, ' ----****----end----****----\n');
      //       }
      //     });
      //   }
      // });

      // // console.log('searchServiceByTYC()--8.0 --$(\'.search-result-single\').toArray():\n', $('.search-result-single ').toArray());
      // // $('.search-result-single ').toArray().map((value, index) => console.log('searchServiceByTYC()--8.1 --index:', index, ', value:', value));
      // $('.search-result-single ').toArray().map((value, index) => {
      //   // console.log('searchServiceByTYC()--8.2 --index:', index, ', $(\'.content\').text():', $('.content').text());
      //   if (value && value.attribs['data-id'] === '3151725787') {
      //     console.log('searchServiceByTYC()--8.3.1 -- ----****----start----****----\n');
      //     // console.log('searchServiceByTYC()--8.3.2 --value:\n', value);
      //     // console.log('searchServiceByTYC()--8.3.3 --value.children:\n', value.children);
      //
      //     console.log('searchServiceByTYC()--8.3.3.1 --value.children[1]-- companyName:\n', value.children[1].children[0].children[0].children[0]);
      //
      //     // console.log('searchServiceByTYC()--8.3.4.1 --value.children[1]:\n', value.children[1]);
      //     // console.log('searchServiceByTYC()--8.3.4.2 --value.children[1].children[0].children[1]:\n', value.children[1].children[0].children[1]);
      //     // console.log('searchServiceByTYC()--8.3.4.3 --value.children[1].children[0].children[1].children[0].data:\n', value.children[1].children[0].children[1].children[0].data);
      //
      //
      //     // console.log('searchServiceByTYC()--8.3.5.1 --value.children[1]:\n', value.children[1].children[1].children[0].children);
      //     // console.log('searchServiceByTYC()--8.3.5.2 --value.children[1]:\n', value.children[1].children[1].children[0].children[0].data);
      //     // console.log('searchServiceByTYC()--8.3.5.3 --value.children[1]:\n', value.children[1].children[1].children[0].children[1].attribs.title);
      //
      //     console.log('searchServiceByTYC()--8.3.9 -- ----****----end----****----\n');
      //   }
      // });

      // if ($('span').hasClass('site')) {
      //   console.log('searchServiceByTYC()--9.0 --', $('span').text());
      // }

      console.log(`searchServiceByTYC()--10.0 --$('.site').text():${$('.site').text()}\n`);

      return resultData || [];
    } catch (error) {
      this.logger.error(error);
      return [];
    }
  }

  async searchServiceByTYC_companyInfo(companyId) {
    // https://www.tianyancha.com/company/3151725787
    const ctx = this.ctx;
    const tempUrl = 'https://www.tianyancha.com/company';
    const topic = `${tempUrl}/company/${companyId || 3151725787}`;
    const result = await ctx.curl(topic, {
      // dataType: 'json',
      // dataType: 'html',
      dataType: 'text',
    });
  }

  // 企查查
  async searchServiceByQCC() {
    const ctx = this.ctx;
    const tempUrl = 'https://www.qichacha.com';

    try {
      // const topic = `https://api.readhub.cn/topic?lastCursor=${53058}&pageSize=${20}`;
      // const topic = 'https://www.tianyancha.com/search?key=%E8%8B%8F%E5%AE%81%E6%98%93%E8%B4%AD';// key=苏宁易购
      const topic = `${tempUrl}/search?key=%E8%8B%8F%E5%AE%81%E6%98%93%E8%B4%AD`;// key=苏宁易购

      const result = await ctx.curl(topic, {
        // dataType: 'json',
        // dataType: 'html',
        dataType: 'text',
      });

      const tempHtml = result.data;
      let resultData = [];
      resultData = result.data;

      const $ = cheerio.load(tempHtml);

      console.log('searchServiceByQCC()--7.0 --$(\'.ma_h1\'):\n', $('.ma_h1'));
      // $('div').toArray().map((value, index) => console.log('searchServiceByQCC()--7 --index:', index, ', value:', value));

      return resultData || [];
    } catch (error) {
      this.logger.error(error);
      return [];
    }
  }

}

module.exports = SearchService;
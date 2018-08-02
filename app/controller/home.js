'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const ctx = this.ctx;
    // ctx.body = 'hi, egg';

    // console.log('home.js--1 --ctx.service:', ctx.service);
    console.log('home.js--1');
    // const searchService_1 = await ctx.service.searchService.searchServiceByPage(53058, 20);
    // this.ctx.body = searchService_1;

    const searchService_2 = await ctx.service.searchService.searchServiceByTYC();
    // console.log('home.js--2 --searchService_2:', searchService_2);
    // const searchService_3 = await ctx.service.searchService.searchServiceByQCC();
    this.ctx.body = searchService_2;
  }
}

module.exports = HomeController;

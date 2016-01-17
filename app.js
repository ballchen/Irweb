'use strict'

require('babel-core/register')
const koa = require('koa')
const app = koa()
const router = require('koa-router')()
const Promise = require('bluebird')
const _ = require('lodash')
const fs = require('fs')
const ejs = require('ejs')
const http = require('http')

const classes = JSON.parse(fs.readFileSync('./classificationArray.json').toString());
let allpost = JSON.parse(fs.readFileSync('allpost.json').toString());

allpost = _.filter(allpost, function(o) { return o.gender == "F"; });

// logger
app.use(function *(next) {
  const start = new Date()
  yield next
  const ms = new Date() - start
  console.log('%s %s - %s ms', this.method, this.url, ms)
})

router.get('/', function*(){
  const template = fs.readFileSync(__dirname + '/views/index.html', 'utf-8')
  this.body = ejs.render(template)
})

router.get('/api/pictures/all', function*() {
	this.status = 200;
	this.body = allpost;
})

router.get('/api/pictures/first', function*() {
	if(this.query.q === "other"){
		this.status = 200;
		this.body = _.intersectionBy(allpost, classes.other, 'id');
	}
	else if(this.query.q === "sexy"){
		let a = _.intersectionBy(allpost, classes.big, 'id');
		a = a.concat(_.intersectionBy(allpost, classes.small, 'id'))
		a = a.concat(_.intersectionBy(allpost, classes.leg, 'id'))
		this.status = 200;
		this.body = a;
	}
	else {
		this.status = 404;
	}
})

router.get('/api/pictures/second', function*() {
	if(this.query.q === "l"){
		this.status = 200;
		this.body = _.intersectionBy(allpost, classes.leg, 'id');
	}
	else if(this.query.q === "b"){
		let a = _.intersectionBy(allpost, classes.big, 'id');
		a = a.concat(_.intersectionBy(allpost, classes.small, 'id'))
		this.status = 200;
		this.body = a;
	}
	else {
		this.status = 404;
	}
})

router.get('/api/pictures/third', function*() {
	if(this.query.q === "big"){
		this.status = 200;
		this.body = _.intersectionBy(allpost, classes.big, 'id');
	}
	else if(this.query.q === "small"){
		this.status = 200;
		this.body = _.intersectionBy(allpost, classes.small, 'id');
	}
	else {
		this.status = 404;
	}
})

router.get('/api/pictures/recommend/:id', function*() {
	let id = this.params.id;
	if(id){
		let clusters = JSON.parse(fs.readFileSync('cluster_flat.json'));
		let recommend = [];
		clusters.forEach(function(c, idx){
			if(c.indexOf(id) >= 0){
				recommend = _.map(c, function(cc){
					return {
						id: parseInt(cc)
					}
				});

			}
		})	

		this.status = 200;
		this.body = _.intersectionBy(allpost, recommend, 'id');
	}
})

app.use(router.routes())
app.use(require('koa-static')(__dirname + '/static'))

app.listen(process.env.PORT || 3020, function(){
  console.log('Server start on Port: '+ (process.env.PORT || 3020));
})


// const http = require('http');
// const path = require('path');
// const fs = require('fs');
// const Koa = require('koa');
// const koaBody = require('koa-body');
// const cors = require('@koa/cors');
// const koaStatic = require('koa-static');
// const uuid = require('uuid');
// const app = new Koa();

// // => Body Parsers
// app.use(koaBody({
//   urlencoded: true,
//   multipart: true
// }));

// // => CORS
// app.use(cors({
//   origin: '*',
//   exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
//   maxAge: 5,
//   credentials: false,
//   allowMethods: ['GET', 'POST', 'DELETE', 'PUT', 'PATCH'],
//   allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
// }));

// // => Static file handling
// // const public = path.join(__dirname, '/public')
// // app.use(koaStatic(public));





// // => GET/POST
// app.use(async (ctx, next) => {

//   ctx.response.set('Access-Controls-Allow-Origin', '*');

//   const tickets = [];
//   const ticketsWithoutDesc = [];

//   const { method } = ctx.request.query;
//   let
//     id,
//     name,
//     description;

//   switch (method) {
//     case 'allTickets':
//       ctx.response.body = JSON.stringify(ticketsWithoutDesc);
//       return;

//     case 'createTicket':
//       id = uuid.v4();
//       name = ctx.response.body.name;
//       description = ctx.response.body.description;
//       const status = false;
//       const created = new Date().toLocaleString();

//       const ticket = new Ticket(id, name, description, status, created);
//       const shortTicket = new TicketShort(id, name, status, created);

//       tickets.push(ticket);
//       ticketsWithoutDesc.push(shortTicket);

//       ctx.response.body = JSON.stringify(ticket);
//       return;


//     case 'ticketById':
//       id = JSON.parse(ctx.request.body);
//       const foundTicket = tickets.find(el => el.id === id);

//       if (foundTicket) {
//         ctx.response.body = JSON.stringify(foundTicket.description);
//       } else {
//         ctx.response.status = 404;
//         ctx.response.body = JSON.stringify({ message: 'Ticket not found' });
//       }
//       return;

//     case 'ticketDone':
//       id = JSON.parse(ctx.request.body);
//       ticketsWithoutDesc.forEach(el => {
//         if (el.id === id) {
//           if (el.status) {
//             el.status = false;
//           } else {
//             el.status = true;
//           }
//         }
//       });

//       tickets.forEach(el => {
//         if (el.id === id) {
//           if (el.status) {
//             el.status = false;
//           } else {
//             el.status = true;
//           }
//         }

//         ctx.response.status = el.status;
//       });

//       return;

//     case 'updateById':
//       const data = JSON.parse(ctx.request.body);
//       id = Number(data.id);

//       const updatedTicket = tickets.find(el => el.id === id);

//       if (updatedTicket) {
//         updatedTicket.name = data.name;
//         updatedTicket.description = data.description;

//         ticketsWithoutDesc.find(el => el.id === id).name = data.name;

//         ctx.response.body = JSON.stringify(updatedTicket);
//       } else {
//         ctx.response.status = 404;
//         ctx.response.body = JSON.stringify({ message: 'Ticket not found' });
//       }
//       return;

//     case 'deleteTicket':
//       id = ctx.request.body;

//       const deleteIndex = ticketsWithoutDesc.findIndex(el => el.id === id);

//       if (deleteIndex > -1) {
//         const deleteTicket = ticketsWithoutDesc.splice(deleteIndex, 1);
//         tickets.splice(tickets.findIndex(el => el.id === id), 1);

//         ctx.response.body = JSON.stringify(deleteTicket);
//       } else {
//         ctx.response.status = 404;
//         ctx.response.body = JSON.stringify({ message: 'Ticket not found' });
//       }
//       return;

//     default:
//       ctx.response.status = 404;
//       return;
//   }

//   next();
// });

// // => File Uploading
// // app.use(async ctx => {
// //   const { name } = ctx.request;
// //   const { file } = ctx.request.files;
// //   const link = await new Promise((resolve, reject) => {
// //     const oldPath = file.path;
// //     const filename = uuid.v4();
// //     const newPath = path.join(public, filename);

// //     const callback = (error) => reject(error);

// //     const readStream = fs.createReadStream(oldPath);
// //     const writeStream = fs.createWriteStream(newPath);

// //     readStream.on('error', callback);
// //     writeStream.on('error', callback);

// //     readStream.on('close', () => {
// //       console.log('close');
// //       fs.unlink(oldPath, callback);
// //       resolve(filename);
// //     });

// //     readStream.pipe(writeStream);
// //   });

// //   ctx.response.body = link;
// // });

// const port = process.env.PORT || 7070;
// http.createServer(app.callback()).listen(port)

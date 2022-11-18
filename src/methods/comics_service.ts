// import { injectable } from 'inversify';
// import fetch from "node-fetch";
// import { ComicsOptions } from './comics_options';

// @injectable()
// export class ComicsService{
//   constructor(
//   ){
//   }
//   async comicsList(){
//     console.log('ffffffffff')
//     const url = `https://${ComicsOptions.hostname}${ComicsOptions.comisclist.path}`;
//     const result = await fetch(url);
//     const body = await result.json();
//     console.log(url)
//     console.log(body.data);
//   }
//   async comicsId(){
//     const url = `https://${ComicsOptions.hostname}${ComicsOptions.comicsId.path}`;
//     const result = await fetch(url);
//     const body = await result.json();
//     console.log(url)
//     // console.log(body.data);
//   }
// }

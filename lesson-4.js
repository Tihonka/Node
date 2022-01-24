#!/usr/local/bin/node
const fs = require('fs');
const path = require('path');
const inquirer = require('inquirer');
const yargs = require('yargs');

const options = yargs
  .option('p', {
      alias: 'path',
      describe: 'path to the directory',
      type: 'string',
      demandOption: false,
      default: process.cwd(),
  })
  .option('f', {
      alias: 'find',
      describe: 'find in the file',
      type: 'string',
      demandOption: false,
      default: '',
  }).argv;
  
let executionDir = options.p

const go = async () =>{
  console.log(executionDir);
  let fullPathList = [];
  const list = fs.readdirSync(executionDir);
  list.map(fileName =>{
   fullPathList.push(path.join(executionDir, fileName));
  });

  let listItem = await inquirer
    .prompt([
      {
        name: 'fileName',
        type: 'list',
        message: 'Выберите файл: ',
        choices: fullPathList.map(item => ({name: item.fileName, value: item})),
      }
    ]).then(answer => answer.fileName);
    console.log(listItem);
    
    if(fs.lstatSync(listItem).isDirectory()){
      executionDir = listItem;
      return await go();
    } else{
      const data = fs.readFileSync(listItem, 'utf-8')      
          if (!options.f){
            console.log(data);
          }else {
            const regExp = new RegExp(options.f, 'igm');
            console.log(data.match(regExp));
          };
        };
};

go();

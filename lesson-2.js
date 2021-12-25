//Ответ на задание № 1: Record 1,Record 5,Record 6,Record 2,Record 3,Record 4


//Задание №2:
//Необходимо ввести дату в формате: "год-месяц-день-часы-минуты-секунды"
//Пример запуска кода: node lesson-2.js 2022-01-01-00-00-00

const moment = require('moment');
const EventEmitter = require('events');
const { clearInterval } = require('timers');

const emitter = new EventEmitter();

const date = process.argv[2].split('-');
const dateYear = +date[0];
const dateMonth = +date[1] -1;
const dateDay = +date[2];
const dateHour = +date[3];
const dateMinute = +date[4];
const dateSecond = +date[5];

const deadline = moment().year(dateYear).month(dateMonth).date(dateDay).hour(dateHour).minute(dateMinute).second(dateSecond);

function timer() {

  const start = () => {
    const now = new moment();
    const fromNow = moment.duration(deadline - now);
    const messageText = `Осталось: ${fromNow.years()} лет, ${fromNow.months()} месяцев, ${fromNow.days()} дней, ${fromNow.hours()} часов, ${fromNow.minutes()} минут, ${fromNow.seconds()} секунд`;

    if(fromNow <= 0){
        emitter.emit('stop', 'Время истекло!');
        clearInterval(go);
    }else{
        emitter.emit('message', messageText);
    } 
   };

  const go = setInterval(start, 1000);
};

timer();

emitter.on('message', (message) =>{
    console.log(message); 
  });

  emitter.on('stop', (stop) =>{
    console.log(stop);
  });

const Database = require('./db') // ./ = pasta local | Está pegando funcionalidades do arquivo db.js e colocando dentro de uma constante
const createProffy = require('./createProffy')

Database.then(async (db) => {
    //Inserir dados
    proffyValue = {
        name: "Diego Fernandes", 
        avatar: "https://avatars2.githubusercontent.com/u/2254731?s=460&amp;u=0ba16a79456c2f250e7579cb388fa18c5c2d7d65&amp;v=4",
        whatsapp: "11977775555",
        bio: "Entusiasta das melhores tecnologias de química avançada. Apaixonado por explodir coisas em laboratório e por mudar a vida das pessoas através de experiências. Mais de 200.000 pessoas já passaram por uma das minhas explosões.",
    }

    classValue = {
        subject: 1,
        cost: "20",
        //O proffy id virá pelo banco de dados
    }

    classScheduleValues = [
        //O class_id virá pelo banco de dados, após cadastrarmos a class
        {
            weekday: 1,
            time_from: 720,
            time_to:1220
        },
        {
            weekday: 0,
            time_from: 520,
            time_to:1220
        }
    ]

    //await createProffy(db, {proffyValue, classValue, classScheduleValues})

    //Consultar dados inseridos

    //Todos os proffys
    const selectedProfyss = await db.all("SELECT * FROM proffys") //Selecione tudo do banco de dados proffys
    //console.log(selectedProfyss)

    //Consultar as classes de um determinado professor | Trazer junto os dados do professor | Selecione tudo de classes e  tudo de proffys, chama a primeira tabela nesse caso proffys, faz a união das duas tabelas através do id, onde classes.proffy.id seja igual ao id
    const selectClassesAndProffys = await db.all(`
        SELECT classes.*, proffys.*
        FROM proffys
        JOIN classes ON (classes.proffy_id = proffys.id)
        WHERE classes.proffy_id = 1;
    `)
    //console.log(selectClassesAndProffys)

    //Descrição: O horário que a pessoa trabalha, por exemplo, é das 8h até as 18h | Botão filtrar
    //O horário do time_from(8h) precisa ser menor ou igual ao horário solicitado | Botão filtrar
    //Já o time_to precisa ser maior | Botão filtrar
    const selectClassesSchedule = await db.all(`
        SELECT class_schedule.*
        FROM class_schedule
        WHERE class_schedule.class_id = "1"
        AND class_schedule.weekday = "0"
        AND class_schedule.time_from <= "520"
        AND class_schedule.time_to >= "520"
    `)
    //console.log(selectClassesSchedule)
    
})
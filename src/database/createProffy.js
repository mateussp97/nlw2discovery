module.exports = async function(db, {proffyValue, classValue, classScheduleValues}){ //Recebendo o banco de dados e os objetos | async foi colocado na frente da função pra poder usar o await
    //Inserir dados na tabela de proffys
    const insertedProffy = await db.run(`
        INSERT INTO proffys (
            name,
            avatar,
            whatsapp,
            bio
        ) VALUES (
            "${proffyValue.name}",
            "${proffyValue.avatar}",
            "${proffyValue.whatsapp}",
            "${proffyValue.bio}"
        );
    `)

    const proffy_id = insertedProffy.lastID

    //Inserir dados na tabela classes
    const insertedClass = await db.run(`
            INSERT INTO classes (
                subject,
                cost,
                proffy_id
            ) VALUES(
                "${classValue.subject}",
                "${classValue.cost}",
                "${proffy_id}"
            );
    `)

    const class_id = insertedClass.lastID

    //Inserir dados na tabela classes_schedule | .map funciona como um forEach, porém consegue retornar um novo array colocando um conteúdo por posição | classScheduleValue dentro do map é referente ao objeto dentro do array classScheduleValues do arquivo test.js
    const insertedAllClassScheduleValues = classScheduleValues.map((classScheduleValue) => {
        return db.run(`
            INSERT INTO class_schedule (
                class_id,
                weekday,
                time_from,
                time_to
            ) VALUES(
                "${class_id}",
                "${classScheduleValue.weekday}",
                "${classScheduleValue.time_from}",
                "${classScheduleValue.time_to}"
            );
        `)
    })

    //Aqui vou executar todos os db.run() das class_schedule | Promise com a função .all consegue executar um array com muitas promessas 
    await Promise.all(insertedAllClassScheduleValues)
}
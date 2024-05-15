delete from answers;
delete from questions;
delete from tests;

INSERT INTO tests VALUES(1, 'Тест об эвакуации');

INSERT INTO questions VALUES(1, 'Что такое эвакуация', 1);
INSERT INTO answers VALUES(1, 'Первый ответ первого вопроса первого теста', 1);
INSERT INTO answers VALUES(2, 'Второй ответ первого вопроса первого теста', 1);
INSERT INTO answers VALUES(3, 'Третий ответ первого вопроса первого теста', 1);
INSERT INTO answers VALUES(4, 'Четвертый ответ первого вопроса первого теста', 1);
INSERT INTO answers VALUES(5, 'Пятый ответ первого вопроса первого теста', 1);

INSERT INTO questions VALUES(2, 'Второй вопрос первого теста', 1);
INSERT INTO answers VALUES(6, 'Первый ответ второго вопроса первого теста', 2);
INSERT INTO answers VALUES(7, 'Второй ответ второго вопроса первого теста', 2);
INSERT INTO answers VALUES(8, 'Третий ответ второго вопроса первого теста', 2);
INSERT INTO answers VALUES(9, 'Четвертый ответ второго вопроса первого теста', 2);
INSERT INTO answers VALUES(10, 'Пятый ответ второго вопроса первого теста', 2);

INSERT INTO questions VALUES(3, 'Третий вопрос первого теста', 1);
INSERT INTO answers VALUES(11, 'Первый ответ третьего вопроса первого теста', 3);
INSERT INTO answers VALUES(12, 'Второй ответ третьего вопроса первого теста', 3);
INSERT INTO answers VALUES(13, 'Третий ответ третьего вопроса первого теста', 3);
INSERT INTO answers VALUES(14, 'Четвертый ответ третьего вопроса первого теста', 3);
INSERT INTO answers VALUES(15, 'Пятый ответ первого третьего первого теста', 3);
function TableRow (author, name, year) {
    this.author = author;
    this.name = name;
    this.year = year;
    return this;
}

var table = [];

table.push(new TableRow('Пушкин', 'Сказки', 1968));
table.push(new TableRow('Остер', 'Вредные советы', 1959));
table.push(new TableRow('Остер', 'Задачник: для младшего школьника', 2008));
table.push(new TableRow('Остер', 'Папамамалогия', 2003));
table.push(new TableRow('Лермонтов', 'Герой нашего времени', 1940));
table.push(new TableRow('Лермонтов', 'Княгиня литовская', 1982));
table.push(new TableRow('Пушкин', 'Скажка о царе Салтане', 1954));
table.push(new TableRow('Пушкин', 'Руслан и Людмила', 1968));
table.push(new TableRow('Пушкин', 'Евгений Онегин', 1825));
table.push(new TableRow('Пушкин', 'Капитанская дочка', 1836));
table.push(new TableRow('Пушкин', 'Дубровский', 1941));

function findBooksAfter60(author){
  var result = [];
  for (var i = 0; i < table.length; i++){
    if (table[i].author == author && table[i].year > 1960) {
      result.push(table[i]);
    }
  }
  if (result.length) for (var i = 0; i < result.length; i++){
    console.log(result[i].name);
  }
  else console.log('No such books')
}

findBooksAfter60('Пушкин');

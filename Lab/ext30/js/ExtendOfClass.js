/**
 * Created by gavin on 2019/9/1.
 */
var Animal = function () {
  console.log('this is Animal constructor');
  this.name = 'animal';
  this.age = 7;
};
Animal.prototype.getAge = function () {
  console.log(this.name + ' `age is ' + this.age);
};
Animal.prototype.getName = function () {
  console.log('this is the animal Name: ' + this.name);
};

var Cat = Ext.extend(Animal, {
  name: 'cat',
  age: '5',
  constructor: function () {
    console.log('this is Cat constructor');
    this.superclass().constructor(arguments);
  },
  getAge: function () {
    console.log(this.name + ' `age is ' + this.age);
    this.superclass().getAge();
  }
});

var homeCat = function () {
  console.log('this is homeCat constructor');
  this.superclass().constructor(arguments);
};
Ext.extend(homeCat, Cat, {
  name: 'homeCat',
  age: 3,
  getAge: function () {
    console.log(this.name + ' `age is ' + this.age);
    this.superclass().getAge();
  },
  say: function () {
    return function (n) {
      console.log(n);
    }
  }()
});

var myCat = new homeCat();
myCat.getAge();
var i = 10;
myCat.say(i);
i += 10;
myCat.say(i);
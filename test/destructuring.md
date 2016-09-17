# Destructuring with Arrays and Objects


##Array Destructuring

Destructuring can be simply thought of as a shorthand to extract data from arrays or objects into variables. We’ll look at how you can use Destructuring to manipulate JavaScript arrays in interesting ways, but first let’s do a very basic example.

```javascript
  let arr = [1, 2, 3];

  let [a, b, c] = arr;

  // a=1, b=2, c=3
```

Check it out, we just pulled each element of that array into variables in the current scope.

###Skipping assignments with Array Destructuring

You can also easily skip over assignments by putting in extra commas in destructuring assignments, it may look strange at first but I think it is cool that this exists.

```javascript

  let arr = ["Gaius", "Julius", "Caesar", "Octavianus"];

  // pull out only the 3rd element
  let [, , x] = arr;

  // x="Caesar"

```

###Cloning arrays

Destructuring also lets you do work in conjunction with the spread operator. The spread operator is a “…” syntax that allows expressions to be expanded out where multiple elements could be expected. We’ll look at an example of what I mean.

```javascript

  let arr = ["Marcus", "Vipsanius", "Agrippa"];

  // clone the array
  let [...copy] = arr;

  // copy = ["Marcus", "Vipsanius", "Agrippa"]

```

###Immutability shorthands

Okay, now let’s use destructing and the spread operator to do something like and array pop or shift that does mess with the original array. This is where destructing really starts to become interesting.


```javascript

  let arr = [5, 6, 7, 8, 9];

  // immutable version of array.shift (we make a copy of the array we remove first element of)
  let [first, ...arrCopy] = arr;

  // first = 5
  // arrCopy = [6, 7, 8, 9]

```

And of course you can do the opposite and concatenate + compose arrays on the right hand side using the spread operator and array literal syntax. The flexibility of destructuring combined with the spread operator is refreshing.

###Object Destructuring

Destructuring works on Objects as well. Object Destructing can be used to pull out variables by object key name and can be used everywhere from import statements to function parameter declarations. Let’s look at a basic example first:

```javascript

  let person = {
    name: 'Elon Musk',
    occupation: 'CEO'
  };

  let { name, occupation } = person;

  // name = 'Elon Musk'
  // occupation = 'CEO'
```

Here we pulled the object keys out into variables of the same name in the current scope.

###Object Destructuring in Method Params

If you often find yourself passing around some complex JavaScript Object called “opts” or “options” through tons of functions you will like this. Being able to Destructure out object keys in method parameters enables you to explicitly pull the keys you need out to perform some action while making it obvious an readable.

```javascript

  function printOccupation({ occupation }) {
    console.log(occupation);
  }

  let person = {
    name: 'Elon Musk',
    occupation: 'CEO'
  };

  // will print 'CEO' to the console.
  printOccupation(person);
```

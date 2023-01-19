window.actions = {};

actions.add = {};
actions.add.types = [Number, Number, Number];
actions.add.function = function(a, b, c){
    return a + b + c;
}

actions.add1 = {
    types: [Number, Number, Number],
    function: function(a, b, c){
        return a + b + c;
    }   
}

// returns a string with the shortest word first, then the second shortes and last the longest.
actions.sortOnLength = {
    types: [String, String, String],
    function: function(a, b, c){
       
        if(a.length < b.length)
            if(b.length < c. length)
                if(a==0)
                    return (b + " " + c)
                else
                return (a + " " + b + " " + c)
            else 
                if(a.length < c.length)
                    return (a + " " + c + " " + b)
                else return (c + " " + a + " " + b)
        else
            if(a.length < c.length)
            return(b + " " + a + " " + c)
            else if(b.length < c.length)
                return(b + " " + c + " " + a)
                else return(c + " " + b + " " + a)
    }
}

testData.productVulnerability = [
    { a: 1, b: 1, c: 1, expected: "Ikke Kritisk" },
    { a: 2, b: 3, c: 4, expected: "Besværlig" },
    { a: 5, b: 5, c: 5, expected: "Kritisk" }
   ];
   testData.vulnerability = [
    {
    a: {disruptive: 1, irreplacible: 1, damaging: 1},
    b: {disruptive: 2, irreplacible: 3, damaging: 4},
    c: {disruptive: 5, irreplacible: 5, damaging: 5},
    expected: ["Ikke Kritisk", "Besværlig", "Kritisk"]
    }
   ]

// returns the sum of the ages of the three persons
actions.totalAge = {
    types: [JSON.parse, JSON.parse, JSON.parse],
    function: function(alice, bob, cat){
        return (alice.age + bob.age + cat.age);
    }
};

//returns the average age of the three persons
actions.averageAge = {
    types: [JSON.parse, JSON.parse, JSON.parse],
    function: function(alice, bob, cat){
        return ((alice.age + bob.age + cat.age)/3);
    }
};

// returns sårbarhed of a single product
actions.productVulnerability = {
    types: [Number, Number, Number],
    function: function(disruptive, irreplacible, damaging){
    if(disruptive * irreplacible * damaging < 10)
        return "Ikke Kritisk";
    if(disruptive * irreplacible * damaging >= 10 && disruptive * irreplacible * damaging <= 99)
        return "Besværlig";
    if(disruptive * irreplacible * damaging > 99)    
        return "Kritisk";
    }
   }

   // returns 'sårbarhed' of the three products in an array
   // each product has properties disruptive, irreplacible, and damaging,
   actions.vulnerability = {
    types: [JSON.parse, JSON.parse, JSON.parse],
    function: function(p1, p2, p3){
   
    return [ -1, -1, -1];
    }
   };

window.runTest = function(actionName, actions, testData){
    var result = "";
    var functionUnderTest = actions[actionName].function;
    var testCases =  testData[actionName];
    for(var i = 0; i  < testCases.length; i++)
        result += testFunctionWith(testCases[i], functionUnderTest);	

    document.getElementById("result").innerHTML = result;
}

window.testFunctionWith = function(testCase, functionUnderTest) {
    var actual = functionUnderTest(testCase.a, testCase.b, testCase.c);
    var passed = actual === testCase.expected;
    var result = `<span style='color: ${passed ? 'green' : 'red'}'>
                    Test ${passed ? "passed" : "failed"}.
                </span>
                <br>`;
    if(!passed)
        result += `Got ${actual} with test input ${JSON.stringify(testCase)}.<br>`;

    return result;
}


try {
    var functions = (await import("./facit.js")).functions;
    for(const fName in functions)
        window.actions[fName].function = functions[fName]; 
} catch (e) {
    console.log("facit.js not found");
}




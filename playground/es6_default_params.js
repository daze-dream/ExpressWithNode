// A look at default params

const greeter = (name = 'unnamed one') => {
    console.log('Hello, ' + name)
}

greeter('stranger')

greeter()


// can even add default parameters to destructured paramters. 
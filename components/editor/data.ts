export const data =
  '# Understanding setTimeout in JavaScript\n\n## Introduction\nIn JavaScript, `setTimeout()` is a function that delays the execution of a callback function by a specified duration. It takes in two parameters - a callback function and a duration in milliseconds. \n\n## Initial Assumption\nInitially, there is a common misconception that `setTimeout()` executes the callback function after the specified duration has expired. However, this is not always the case in JavaScript.\n\n## Real Working\nWhen `setTimeout()` is called, it sends the callback function to be executed in a web API. Once the web API is done with the execution, it adds the function back to the queue.\n\nMeanwhile, the call stack (where all synchronous functions are stored) continues executing other functions. Once the call stack is empty, then and only then the function waiting in the event loop gets back to the call stack and gets executed.\n\n## Example\nFor instance, in an example of a nested loop that takes more than 3-4 seconds, and `setTimeout()` is set to 0 milliseconds, it would still not be executed instantly. The event loop and web APIs would handle it and put it back in the queue.\n\n## Conclusion\nUnderstanding the principles behind the `setTimeout()` function in JavaScript can be very helpful in writing cleaner and efficient code. \n\n> "The call stack has all the functions which are supposed to be called. But as soon as it hits an asynchronous function, it sends that function to be executed in a web API. Once the web API is done with that, it fires that function to the queue." - Author \n\n![JavaScript event loop](https://miro.medium.com/max/1400/1*jpYyAKJ8Q2MI1FXuSKFj4w.png)\n\n*(Image source: Medium)*';

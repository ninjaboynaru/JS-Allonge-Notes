/*
* EXPLINATION:
* The factorial of a non-negative integer n, denoted by n!, is the
* product of all positive integers less than or equal to n.
* 
* For Example:
* 5! = 5  x  4  x  3  x  2  x  1 = 120.
*/

/**
* Asortment of methods to find the facotorial of a number.
* Created by Thiago HPC
*/
var FactorialMethods =
{
	
	/**
	* Get the factorial of a number using a for loop
	* @function
	*/
	FactorialLoop: function(num)
	{
		var factorial = num;
		for(let i = num-1; i > 0; i--)
		{
			factorial *= i;
		}
		return factorial;
	},
	
	
	/**
	* Non tail-call optimized recursive factorial function.
	*
	* @function
	*/
	FactorialRecursiveV1: function FactorialRecursiveV1(num)
	{
		if(num == 0)
		{
			return 1;
		}
		else
		{
			return num * FactorialRecursiveV1(num-1);
		}
	},
	
	
	/**
	* Tail-Call optimized recursive factorial function.
	*
	* The argument 'accumulate' stores the result of the multiplication and it's finaly returned when
	* the argument 'num' reaches zero.
	* @function
	*/
	FactorialRecursiveV2: function FactorialRecursiveV2(num, accumulate=1)
	{
		if(num == 0)
		{
			return accumulate;
		}
		else
		{
			return FactorialRecursiveV2(num-1, accumulate * num);
		}
	}
	
	
}




if(typeof module != 'undefined'){module.exports = FactorialMethods}
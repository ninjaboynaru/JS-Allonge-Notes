

/**
* Asortment of methods to flatten an array.
* Created by Thiago HPC
*/
var FlattenMethods = 
{
	
	/**
	* Flatten an array without using the spread operator '...'.
	*
	* Instead recursivly calls itself, and passes a reference of the flattened array, and pushes elements
	* into that reference.
	*
	* @function
	*/
	FlattenV1: function FlattenV1(input, flattened)
	{
		if(flattened == undefined){ flattened = [] }

		for(let i = 0; i < input.length; i++)
		{
			if(Array.isArray(input[i]) )
			{
				FlattenV1(input[i], flattened);
			}
			else
			{
				flattened.push(input[i]);
			}
		}

		return flattened;
	},


	/**
	* Recursive flattening function without using spread syntax.
	* May consume more memeory than the other flatten methods.
	*
	* Creates a flettened array variable and for each element 
	* in the input, it adds the element to the flattened array.
	*
	* But, if that element is an array itself, then it loops over the results
	* of flattening that element and adds those results to the flattened array.
	*
	* Finaly, it returns the flattened array.
	*
	* @function
	*/
	FlattenV2: function FlattenV2(input)
	{
		var flattened = [];

		for(let i = 0; i < input.length; i++)
		{
			if(Array.isArray(input[i]) )
			{
				let subArray = FlattenV2(input[i]);
				subArray.forEach(function(element){flattened.push(element)} );
			}
			else
			{
				flattened.push(input[i]);
			}
		}

		return flattened;	
	},



	/**
	* Flatten an array using spread syntax.
	* @function
	*/
	FlattenV3: function FlattenV3( [first, ...rest] )
	{
		if(first == undefined)
		{
			return [];
		}
		if(Array.isArray(first) == false)
		{
			return [first, ...FlattenV3(rest)];
		}
		else
		{
			return [...FlattenV3(first), ...FlattenV3(rest)]
		}

	}

}

if(typeof module != 'undefined'){ module.exports = FlattenMethods }



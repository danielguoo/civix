# Testing Scenarios

## Prerequisities

Make sure you've properly implemented the steps in the civix/civix-backend to setup the environment to ensure correct testing behavior. 

## Structure of the test suite

The database has 4 tables 
-  **Events model** that represents calendar events such as the General Election. Test cases in the `civix/civix-backend/core/test_Events.py` file.
-  **Items model** that represents specific ballot board threads. Test cases in the `civix/civix-backend/core/test_Items.py` file.
-  **Posts model** that represents user opinions on a particular thread. Test cases in the `civix/civix-backend/core/test_Posts.py` file.
-  **Profile model** that represents Civix users. Test cases in the `civix/civix-backend/core/test_Profile.py` file.

## Running the test suite

The following command will run all the test cases across all the test modules. </br>

``` 
$ cd civix/civix-backend
$ python3 manage.py test
```
This will run 26 different test cases scrutinizing the apis being used

## Reading the test cases

Each test file has an initialization in the `setUp()` function, followed by a set of positive test cases that show that the individual GET, POST, etc, methods work as expected. That is later followed by a set of negative test cases that checks whether or not our code crashes for ill formed requests. 

The comments within each test case contain a written test oracle, while the `assertEqual(first, second)` checks for the equality of the given output (first) with the expected output (second). If `first != second`, it will appear as a failure in the test shell, otherwise it will proceed as expected.

`getItemsInDB(url)` is a helper function that sends a GET request to get the updated state of the database to confirm that the database is as it should be (see caveats of the test suite).

## Caveats of the test suite

* Individual test cases aren't executed in any particular order. 
* The test database created in the `setUp()` function is used by every test case -- the actions of one test case are independent of other test cases. The database has no side-effects.
* This implies that when there is a successful post request, the number of items in the database goes from 3 -> 4. If this is followed by a delete request, the number of items in the database goes from 3 -> 2, not 4 -> 3. 
* The Profile API isn't fully functional. 

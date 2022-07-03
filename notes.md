# Football Quotes Site

## Tasks

Image size problem with logo when resizing.

Change colour of hamburger?

Improve mobile navigation.

Test social links.





## Code

Quote display code in: index, new, team, author.

```
// Paginated sorted by newest, but did not show unique on each page
/*
|----------------------------------------------------------------------
| New - Display all quotes by newest- new.ejs
|----------------------------------------------------------------------
*/

const resultsPerPageNew = 20;

exports.new = (req, res) => {
    
try {

	pool.getConnection((err, connection) => {
		
		//if (err) throw err;
		if (err) { console.log(err); }

		let sql = 'SELECT * FROM quotes;';

			connection.query(sql, (err, result) => {
				// if(err) throw err;
				if (err) { console.log(err); }
				console.log('Connected as ID: ' + connection.threadId);
				const numOfResults = result.length;
				const numberOfPages = Math.ceil(numOfResults / resultsPerPageNew);
				let page = req.query.page ? Number(req.query.page) : 1;
				if (page > numberOfPages) {
					res.redirect('/?page='+encodeURIComponent(numberOfPages));
				} else if (page < 1) {
					res.redirect('/?page='+encodeURIComponent('1'));
				}

		const startingLimit = (page - 1) * resultsPerPageIndex;
		
		let sql = `SELECT quotes.id, quotes.added, quotes.votes, authors.author_id, authors.image, authors.fname, authors.lname, teams.name, quotes.summary, quotes.quote, quotes.votes FROM quotes INNER JOIN teams ON quotes.team_id=teams.id INNER JOIN authors ON quotes.author_id=authors.author_id ORDER BY quotes.added DESC LIMIT ${startingLimit},${resultsPerPageNew}`;
			
			connection.query(sql, (err, result) => {
				// if(err) throw err;
				if (err) { console.log(err); }
				console.log('Connected as ID2: ' + connection.threadId);
				let iterator = (page - 5) < 1 ? 1 : page - 5;
				let endingLink = (iterator + 9) <= numberOfPages ? (iterator + 9) : page + (numberOfPages - page);
				if (endingLink < (page + 4)) {
					//iterator -= (page + 4) - numberOfPages;
					iterator -= (page) - numberOfPages;
				}
				connection.release(); // Release connection?
				res.render('new', { data: result, page, iterator, endingLink, numberOfPages });
			});
    	});
	});

} catch (err) {
	console.log(err);
}

};
```


```
// Loop through result data
<%
data.forEach(items => {
    for (let key in items) { 
%>
    <p>
        <%= `${key}: ${items[key]}`; %>
    </p>
<%
    }
});
%>

/*
author_id: 85
fname: David
lname: Acfield
image: null
author_id: 202
fname: Ade
lname: Akinbiyi
image:
*/
```

```
// Loop through lname
<%
for(let auth in data){
%>
   <p><%= data[auth].lname; %></p>
<%
}
%>

/*
Acfield
Akinbiyi
Allardyce
Atkinson
Balotelli
Barnes
Bassett
*/
```

```
// Get first letter of string
<%
for(let auth in data){
%>
   <p><%= data[auth].lname.charAt(0); %></p>
<%
}
%>
```

```
ring-2 ring-gray-700
```


Change these two numbers (4 4)to change how many numbers appear on pagination:
```
let endingLink = (iterator + 4) <= numberOfPages ? (iterator + 4) : page + (numberOfPages - page);
```

```
<%- include('partials/head') %>

    <div class="container mx-auto px-20 pt-3 mt-5">
        <div class="container px-5 py-10 mx-auto">	
            <div class="flex flex-wrap -m-4">
                
                <% for(let row of rows) { %>
                <!-- start loop -->
                    <div class="max-w-md px-8 py-4 mx-auto mt-10 bg-gray-200 rounded-lg shadow-lg">
                        
                        <p class="mt-2 text-gray-900 dark:text-gray-500">
                            <a href="team/<%= row.id %>">
                                <%= row.name %>
                            </a>
                        </p>
                        
                    </div>
                
                <!-- end loop -->
                <% } %>

            </div>
        </div>
    </div>



<%- include('partials/foot') %>
```

```
// Old authors.ejs pagination

   <div class="flex items-center justify-center pt-28 pb-28">
        <div>
            <ul class="inline-flex -space-x-px">
            <% if(page > 1) { %> 
                <li>
                    <a href="/authors/?page=<%=page-1%>" class="py-2 px-3 ml-0 leading-tight text-gray-700 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-300 hover:text-gray-700">Previous</a>
                </li>
            <% } %>
    
            <% for(let i = iterator; i <= endingLink; i++) { %>
                <% if(i === page) { %>
                    <li>
                        <a href="/authors/?page=<%=i%>" class="py-2 px-3 leading-tight text-gray-900 bg-yellow-500 border border-gray-300 hover:bg-lime-200 hover:text-gray-700"><%=i%></a>
                    </li>
                <% continue; %>
            <% } %>
                <li>
                    <a href="/authors/?page=<%=i%>" class="py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-lime-200 hover:text-gray-700"><%=i%></a>
                </li>
            <% } %>
            <% if(page < numberOfPages) { %> 
                <li>
                    <a href="/authors/?page=<%=page+1%>" class="py-2 px-3 leading-tight text-gray-700 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-300 hover:text-gray-700">Next</a>
                </li>
            <% } %>
            </ul>
        </div>
    </div>
```


```
-- SELECT teams.team, quotes.summary, authors.author, quotes.quote FROM quotes WHERE author_id = 182 INNER JOIN teams ON quotes.team_id=teams.id INNER JOIN authors ON quotes.author_id=authors.id;

SELECT quotes.id, quotes.quote, authors.fname, authors.lname FROM quotes INNER JOIN authors ON quotes.author_id=authors.author_id WHERE author_id = 182;
```

```

// Initial loop

<% for(let row of rows) { %>
			<!-- start loop -->
			<div class="lg:w-1/4 md:w-1/2 p-4 w-full">
                <div class="max-w-md px-8 py-4 mx-auto mt-10 bg-gray-200 rounded-lg shadow-lg dark:bg-gray-800">

                    <p class="mt-2 text-gray-900 dark:text-gray-500">
                        <img width="14" height="14" class="inline" src="./images/icons/double-quotes-l.png" alt="">
                        <%= row.quote %>
                        <img width="14" height="14" class="inline" src="./images/icons/double-quotes-r.png" alt="">
                        <% if(row.image) { %>
                        <img width="100" height="100" class="rounded" src="http://localhost/projects/footballquotes-admin/public/images/authors/<%= row.image %>">
                        <% } %>
                    </p>

                    <div class="flex justify-end mt-4">
                        <a href="#" class="text-xl font-medium text-gray-900 dark:text-blue-300">
                            <%= row.fname %> <%= row.lname %>
                        </a>
                    </div>
                </div>
            </div>
			<!-- end loop -->
<% } %>
```

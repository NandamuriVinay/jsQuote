const quoteContainer=document.getElementById('quote-container');
const quoteText=document.getElementById('quote');
const authorText=document.getElementById('author');
const twitterBtn=document.getElementById('twitter');
const newQuoteBtn=document.getElementById('next-quote');
const loader=document.getElementById('loader');

let apiQuotes=[];

function showingLoaderSpinner(){
    loader.hidden=false;
    quoteContainer.hidden=true;
}

function removeLoaderSpinner(){
    quoteContainer.hidden=false;
    loader.hidden=true;
}

function newQuote(){
    showingLoaderSpinner();
    const quote=apiQuotes[Math.floor(Math.random()*apiQuotes.length)];
    if(!quote.author){
        authorText.textContent='Unknown';
    }

    else{
        authorText.textContent=quote.author;
    }

    if(quote.text.length>115){
        quoteText.classList.add('long-quote');
    }
    else{
        quoteText.classList.remove('long-quote');
    }
    quoteText.textContent=quote.text;
    removeLoaderSpinner();

}

async function getQuotes(){
    showingLoaderSpinner();
    const apiUrl='https://type.fit/api/quotes';
    try{
        const response=await fetch(apiUrl);
        apiQuotes=await response.json();
        newQuote()
    }
    catch(error){
        newQuote();
    }
}

function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.innerText} - ${authorText.innerText}`;
    window.open(twitterUrl, '_blank');
  }
  
  // Event Listeners
  newQuoteBtn.addEventListener('click', newQuote);
  twitterBtn.addEventListener('click', tweetQuote);
  
  // On Load
  getQuotes();

    // global variables 
 
    let currentMonth = "";
    let currentYear = "";
    let PostTitles = new Array();
    let PostURLs = new Array();
    let PostYears = new Array();
    let PostMonths = new Array();
    let PostDays = new Array();
    let PostTags = new Array();
    let PostWalk = new Array();
    let PostSummary = new Array();
//        Sort out the diary entry type required
         if (IndexType == "")
         {
           IndexType="Index";
         }
//       Function called when the extract returns  
  function LoadTheArchive(TotalFeed)
{
    if("entry" in TotalFeed.feed)
    {
      let PostEntries=TotalFeed.feed.entry.length;
    for(var PostNum=0; PostNum<PostEntries ; PostNum++)
      {
      let ThisPost = TotalFeed.feed.entry[PostNum];
      let AddThis = "Yes"; //so we can filter out some posts!

// loop around the URLs to get the one we want
      let ThisPostURL;
      for(let LinkNum=0; LinkNum < ThisPost.link.length; LinkNum++)
        {
          if(ThisPost.link[LinkNum].rel == "alternate")
          {
             ThisPostURL = ThisPost.link[LinkNum].href;
             break
          }
        }

        // shorten the summary if a more tag is found
        let ThisSummaryFull=ThisPost.summary.$t;
        let ThisSummaryShort=ThisSummaryFull;
         if (ThisSummaryFull.includes("//")) {
             ThisSummaryShort = ThisSummaryFull.substring(0,ThisSummaryFull.indexOf("//"))
             }
         else if (ThisSummaryFull.includes(".")) {
              ThisSummaryShort = ThisSummaryFull.substring(0,ThisSummaryFull.lastIndexOf(".")+1)
                  }
        
        // loop around the categories (tags) to get them all in one field. And also manipulate the marker ones.
        let ThisPostTags = "";
        let ThisWalkTag="";
        let ThisTag="";
        let NumTags=ThisPost.category.length;
        
        for(let TagNum=0; TagNum < NumTags; TagNum++)
        {
         ThisTag=ThisPost.category[TagNum].term;
         if (ThisTag == "@Day")
         {
           ThisWalkTag="Solo "+ IndexType;
         } 
          else if (ThisTag == "@Meet")
       {
         ThisWalkTag="Meet "+ IndexType;
       } 
          else if (ThisTag == "@Group")
       {
         ThisWalkTag="Group "+ IndexType;
       } 
          else if (ThisTag == "@Break")
       {
         ThisWalkTag="Short Break "+ IndexType;
       } 
          else if (ThisTag == "@Trip")
       {
         ThisWalkTag="Trip "+ IndexType;
       } 
          else if (ThisTag == "@Work")
       {
         ThisWalkTag="Work "+ IndexType;
       } 
          else if (ThisTag == "Summary")
       {
         AddThis="No";
       } 
          else if (ThisTag.substring(0,1) == "*")
       {
 ///  ignore
       } 
          else if (ThisTag > 1959)
       {
 ///  ignore as in the search criteria
       } 
          else if (ThisTag == "Walk")
       {
 ///  ignore as in the Search Criteria
       }
          else if (ThisTag == "AAC")
       {
 ///  ignore as group name
       }
          else if (ThisTag == "BOC")
       {
 ///  ignore as group name
       }
          else if (ThisTag == "WACT")
       {
 ///  ignore as group name
       } 
          else
         {

          if (ThisPostTags=="")
           {
             ThisPostTags=ThisTag;
           }
          else
           {
             ThisPostTags = ThisPostTags + "," + ThisTag;
           }
         }

       }

        if (AddThis=="Yes")
        {
      PostTitles.push(ThisPost.title.$t);
      PostYears.push(ThisPost.published.$t.substring(0,4));
      PostMonths.push(ThisPost.published.$t.substring(5,7));
      PostDays.push(ThisPost.published.$t.substring(8,10));
      PostURLs.push(ThisPostURL);
      PostTags.push(ThisPostTags);
      PostWalk.push(ThisWalkTag);
   	  PostSummary.push(ThisSummaryShort);
        }
        
        
   // loop around posts until finished
      }
    }
}

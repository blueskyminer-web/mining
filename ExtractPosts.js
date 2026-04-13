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
//        Sort out the diary entry type required "Index" or "Walk"
  if (typeof IndexType === 'undefined' || IndexType === null) {
           IndexType="Index";
         }
//    soprt out the order of display "Reverse" or "Chrono"
  if (typeof ListOrder === 'undefined' || ListOrder === null) {
    ListOrder = "Reverse";
}
//        Sort out the summary entry type required "Short" or "Summary"
  if (typeof OutputType === 'undefined' || OutputType === null) {
           OutputType="Short";
         }
//       Function called when the extract returns  
  function LoadTheArchive(TotalFeed)
  {
      if("entry" in TotalFeed.feed)
      {
      let PostEntries=TotalFeed.feed.entry.length;
      for(let PostNum=0; PostNum<PostEntries ; PostNum++)
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

//  extract teh summary field ... need to cut out th ejavascript sections
        let ThisPostSummary = ThisPost.summary.$t;
         if (ThisPostSummary.includes("//")) {
             ThisPostSummary = ThisPostSummary.substring(0,ThisPostSummary.indexOf("//"))
             }
         else if (ThisPostSummary.includes(".")) {
              ThisPostSummary = ThisPostSummary.substring(0,ThisPostSummary.lastIndexOf(".")+1)
                  }
         
// Now fiddle the date for the index entries
         let ThisPostDays = ThisPost.published.$t.substring(8,10);
         let ThisPostMonth = ThisPost.published.$t.substring(5,7);
         
///  extract the title so we can process it later
         let ThisPostTitle = ThisPost.title.$t;
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
           ThisWalkTag="Solo " + IndexType;
         } 
          else if (ThisTag == "@Meet")
       {
         ThisWalkTag="Meet " + IndexType;
       } 
          else if (ThisTag == "@Group")
       {
         ThisWalkTag="Group "  + IndexType;
       } 
          else if (ThisTag == "@Break")
       {
         ThisWalkTag="Short Break " + IndexType;
       } 
          else if (ThisTag == "@Holiday")
       {
         ThisWalkTag="Holiday " + IndexType;
       } 
          else if (ThisTag == "Ski Tour")
       {
         ThisWalkTag="Ski Tour " + IndexType;
       } 
          else if (ThisTag == "Mountaineering")
       {
         ThisWalkTag="Mountaineering " + IndexType;
       } 
          else if (ThisTag == "Rock Climbing")
       {
         ThisWalkTag="Rock Climbing " + IndexType;
       } 
          else if (ThisTag == "ski")
       {
         ThisWalkTag="Ski " + IndexType;
       } 
          else if (ThisTag == "@Trip")
       {
           if (IndexType == "Walk")
          {         ThisWalkTag="Trip " + IndexType;
          } else {
// ignore
          }
       } 
          else if (ThisTag == "@Work")
       {
         ThisWalkTag="Work " + IndexType;
       } 
          else if (ThisTag == "@Annual")
       {
          if (IndexType == "Walk")
          { AddThis="No";
          } else if (ThisPostTitle.includes("Overview"))
          {
       		ThisPostDays = "";
         	ThisPostMonth = 13;
          } else {
       		ThisPostDays = "";
         	ThisPostMonth = 0;
          }
       } 
          else if (ThisTag.substring(0,1) == "*")
       {
 ///  ignore
       } 
          else if (ThisTag > 1959)
       {
 ///  ignore as in the search criteria
       } 
          else if (ThisTag == "Summary")
       {
          if (IndexType == "Walk")
          { AddThis="No";
          } else {
// ignore
          }
       }
          else if (ThisTag == "Walk")
       {
 ///  ignore as in the Search Criteria
       }
          else if (ThisTag == "Index")
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
          else if (ThisTag == "Old Farts")
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
// if tags exist then wrap in brackets
          ThisPostTags="("+ThisPostTags+")";
          if (ThisPostTags =="()") {
             ThisPostTags="";
          }
     
     if (AddThis=="Yes")
        {
      PostTitles.push(ThisPostTitle);
      PostYears.push(ThisPost.published.$t.substring(0,4));
      PostMonths.push(ThisPostMonth);
      PostDays.push(ThisPostDays);
      PostSummary.push(ThisPostSummary);
      PostURLs.push(ThisPostURL);
      PostTags.push(ThisPostTags);
      PostWalk.push(ThisWalkTag);
        }
        
        
   // loop around posts until finished
   }
      }
  }


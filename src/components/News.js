import React, { Component } from "react";
import NewsItem from "./NewsItem";

export class News extends Component {
    article = [{
        "status": "ok",
        "totalResults": 4,
        "articles": [
          {
            "source": {
              "id": "news-com-au",
              "name": "News.com.au"
            },
            "author": null,
            "title": "Wife reveals cricketer’s tragic cause of death",
            "description": "Graham Thorpe’s wife has revealed the cricket legend took his own life as she opened up on his mental health battles.",
            "url": "https://www.news.com.au/sport/cricket/graham-thorpes-wife-reveals-cricket-greats-tragic-cause-of-death/news-story/5774b738723f6e9d389ea06a1675e8eb",
            "urlToImage": "https://content.api.news/v3/images/bin/f252c7fe1e0c42e7da1787a89fcf8c20",
            "publishedAt": "2024-08-12T08:46:00Z",
            "content": "Graham Thorpe’s wife has revealed the cricket legend took his own life as she opened up on his mental health battles.\r\nThorpe died aged 55 last week after a long and illustrious career for England an… [+4346 chars]"
          },
          {
            "source": {
              "id": "bloomberg",
              "name": "Bloomberg"
            },
            "author": "Bloomberg",
            "title": "The Fake Indian Cricket League Created for Real Online Betting",
            "description": null,
            "url": "https://news.google.com/rss/articles/CBMiswFBVV95cUxOSTJ6U2NtSjdjVG5NeXF1TUZaZlk1UzBaQkpSckxycUhXajk3ZWdPQzZxd1dTbWtGZE9IbzIyS2d1bWlDVkZ1WkpENXZMVE9JWjk2ZFNQZzVvUS1mOWtXZm5TWm9FM2draWxoN3JGUlE1cDMzOUE1QXJKcEVaU3Q3UEFVWkRWNS01NXh4U1RIQzVSdXRDYWJMa3p5ejUzYVV0RUIzckJFMmVlRWNESlRLa0R5aw?oc=5",
            "urlToImage": null,
            "publishedAt": "2024-08-11T21:00:13+00:00",
            "content": null
          },
          {
            "source": {
              "id": "espn-cric-info",
              "name": "ESPN Cric Info"
            },
            "author": null,
            "title": "PCB hands Umar Akmal three-year ban from all cricket | ESPNcricinfo.com",
            "description": "Penalty after the batsman pleaded guilty to not reporting corrupt approaches | ESPNcricinfo.com",
            "url": "http://www.espncricinfo.com/story/_/id/29103103/pcb-hands-umar-akmal-three-year-ban-all-cricket",
            "urlToImage": "https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1099495_800x450.jpg",
            "publishedAt": "2020-04-27T11:41:47Z",
            "content": "Umar Akmal's troubled cricket career has hit its biggest roadblock yet, with the PCB handing him a ban from all representative cricket for three years after he pleaded guilty of failing to report det… [+1506 chars]"
          },
          {
            "source": {
              "id": "espn-cric-info",
              "name": "ESPN Cric Info"
            },
            "author": null,
            "title": "What we learned from watching the 1992 World Cup final in full again | ESPNcricinfo.com",
            "description": "Wides, lbw calls, swing - plenty of things were different in white-ball cricket back then | ESPNcricinfo.com",
            "url": "http://www.espncricinfo.com/story/_/id/28970907/learned-watching-1992-world-cup-final-full-again",
            "urlToImage": "https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1219926_1296x729.jpg",
            "publishedAt": "2020-03-30T15:26:05Z",
            "content": "Last week, we at ESPNcricinfo did something we have been thinking of doing for eight years now: pretend-live ball-by-ball commentary for a classic cricket match. We knew the result, yes, but we tried… [+6823 chars]"
          }
        ]
      }
    ]
    constructor(){
        super();
        console.log("Hellllo im cons from news component");
        this.state = {
            articles: this.articles,
            loading: false
        }
    }


  render() {
    return (
      <div className="container my-3">
        <h2> NewsMonkey - Top Headlines</h2>
        <div className="row">
          <div className="col-md-4">
            <NewsItem title="myTilte" description="myDes" imageUrl="https://content.api.news/v3/images/bin/f252c7fe1e0c42e7da1787a89fcf8c20" newsUrl="TODO"/>
          </div>
          <div className="col-md-4">
            <NewsItem title="myTilte" description="myDes" />
          </div>
          <div className="col-md-4">
            <NewsItem title="myTilte" description="myDes" />
          </div>
        </div>
      </div>
    );
  }
}

export default News;

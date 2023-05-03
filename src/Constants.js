import Hearts2 from "./static/hearts_2.png"
import Hearts3 from "./static/hearts_3.png"
import Hearts4 from "./static/hearts_4.png"
import Hearts5 from "./static/hearts_5.png"
import Hearts6 from "./static/hearts_6.png"
import Hearts7 from "./static/hearts_7.png"
import Hearts8 from "./static/hearts_8.png"
import Hearts9 from "./static/hearts_9.png"
import Hearts10 from "./static/hearts_10.png"
import HearstJack from "./static/hearts_jack.png"
import HeartsQueen from "./static/hearts_queen.png"
import HeartsKing from "./static/hearts_king.png"
import HeartsAce from "./static/hearts_ace.png"

const Constants = new function() {
    this.CARD_VALUE_MAP = {
        "2":2,
        "3":3,
        "4":4,
        "5":5,
        "6":6,
        "7":7,
        "8":8,
        "9":9,
        "10":10,
        "jack":11,
        "queen":12,
        "king":13,
        "ace":14
    };
    this.CARD_VALUES = Object.keys(this.CARD_VALUE_MAP);
    this.CARD_SUITS = ["diamonds", "spades", "clovers", "hearts"];
    this.CARD_IMAGES = {
        "hearts 2":Hearts2,
        "hearts 3":Hearts3,
        "hearts 4":Hearts4,
        "hearts 5":Hearts5,
        "hearts 6":Hearts6,
        "hearts 7":Hearts7,
        "hearts 8":Hearts8,
        "hearts 9":Hearts9,
        "hearts 10":Hearts10,
        "hearts jack":HearstJack,
        "hearts queen":HeartsQueen,
        "hearts king":HeartsKing,
        "hearts ace":HeartsAce
    }
  }
  export default Constants;

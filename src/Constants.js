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

import Spades2 from "./static/spades_2.png"
import Spades3 from "./static/spades_3.png"
import Spades4 from "./static/spades_4.png"
import Spades5 from "./static/spades_5.png"
import Spades6 from "./static/spades_6.png"
import Spades7 from "./static/spades_7.png"
import Spades8 from "./static/spades_8.png"
import Spades9 from "./static/spades_9.png"
import Spades10 from "./static/spades_10.png"
import SpadesJack from "./static/spades_jack.png"
import SpadesQueen from "./static/spades_queen.png"
import SpadesKing from "./static/spades_king.png"
import SpadesAce from "./static/spades_ace.png"

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
    this.CARD_SUITS = ["diamonds", "spades", "clovers", "Spades"];
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
        "hearts ace":HeartsAce,
        "spades 2":Spades2,
        "spades 3":Spades3,
        "spades 4":Spades4,
        "spades 5":Spades5,
        "spades 6":Spades6,
        "spades 7":Spades7,
        "spades 8":Spades8,
        "spades 9":Spades9,
        "spades 10":Spades10,
        "spades jack":SpadesJack,
        "spades queen":SpadesQueen,
        "spades king":SpadesKing,
        "spades ace":SpadesAce,
    }
  }
  export default Constants;

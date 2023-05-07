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

import Clovers2 from "./static/clovers_2.png"
import Clovers3 from "./static/clovers_3.png"
import Clovers4 from "./static/clovers_4.png"
import Clovers5 from "./static/clovers_5.png"
import Clovers6 from "./static/clovers_6.png"
import Clovers7 from "./static/clovers_7.png"
import Clovers8 from "./static/clovers_8.png"
import Clovers9 from "./static/clovers_9.png"
import Clovers10 from "./static/clovers_10.png"
import CloversJack from "./static/clovers_jack.png"
import CloversQueen from "./static/clovers_queen.png"
import CloversKing from "./static/clovers_king.png"
import CloversAce from "./static/clovers_ace.png"

import Diamonds2 from "./static/diamonds_2.png"
import Diamonds3 from "./static/diamonds_3.png"
import Diamonds4 from "./static/diamonds_4.png"
import Diamonds5 from "./static/diamonds_5.png"
import Diamonds6 from "./static/diamonds_6.png"
import Diamonds7 from "./static/diamonds_7.png"
import Diamonds8 from "./static/diamonds_8.png"
import Diamonds9 from "./static/diamonds_9.png"
import Diamonds10 from "./static/diamonds_10.png"
import DiamondsJack from "./static/diamonds_jack.png"
import DiamondsQueen from "./static/diamonds_queen.png"
import DiamondsKing from "./static/diamonds_king.png"
import DiamondsAce from "./static/diamonds_ace.png"

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
        "clovers 2":Clovers2,
        "clovers 3":Clovers3,
        "clovers 4":Clovers4,
        "clovers 5":Clovers5,
        "clovers 6":Clovers6,
        "clovers 7":Clovers7,
        "clovers 8":Clovers8,
        "clovers 9":Clovers9,
        "clovers 10":Clovers10,
        "clovers jack":CloversJack,
        "clovers queen":CloversQueen,
        "clovers king":CloversKing,
        "clovers ace":CloversAce,

        "diamonds 2":Diamonds2,
        "diamonds 3":Diamonds3,
        "diamonds 4":Diamonds4,
        "diamonds 5":Diamonds5,
        "diamonds 6":Diamonds6,
        "diamonds 7":Diamonds7,
        "diamonds 8":Diamonds8,
        "diamonds 9":Diamonds9,
        "diamonds 10":Diamonds10,
        "diamonds jack":DiamondsJack,
        "diamonds queen":DiamondsQueen,
        "diamonds king":DiamondsKing,
        "diamonds ace":DiamondsAce
    }
  }
  export default Constants;

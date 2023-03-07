import Cookies from "universal-cookie";

const cookies = new Cookies();

export function createUUIDandSetInCookieIfDoesNotExist() {

 const player_id = getUUIDFromCookie()
 if(player_id === undefined){
     // TODO - revisit this if the application scales - currently very small risk of UUID conflicts
    const player_id = Math.floor(Math.random() * 1000000000000);
    cookies.set("player_id", player_id);
 }

}

export function getUUIDFromCookie() {
  const player_id = cookies.get("player_id");
  return player_id;
}
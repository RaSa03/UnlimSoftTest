import { ref } from "vue";
import { useIsChanged } from "@/store/isChanged";

const URL = "https://my-json-server.typicode.com/RaSa03/FakeServer/db";

const setPlayers = () => {
  const GROUP_PLAYERS_NUMBER = 3;
  const playersSumInGroup = ref(0);
  const players = ref([]);
  const groups = ref([]);
  const saveBtnDisabled = ref(true);

  const getPlayersAndGroups = async () => {
    await fetch(URL)
      .then((data) => data.json())
      .then((data) => {
        let groupsList = data.groups;
        let plList = data.players;

        groupsList.forEach((item) => {
          item.players = [];
        });
        groups.value = groupsList;
        plList.forEach((item) => {
          item.nameAndSurname = item.surname + " " + item.name;
        });
        players.value = plList;
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const addPlayerToGroup = (player) => {
    playersSumInGroup.value++;
    useIsChanged().isChanged = true;
    const Player = player.data;
    for (const item of groups.value) {
      if (item.players.length < GROUP_PLAYERS_NUMBER) {
        item.players.push(Player);
        break;
      }
    }
    players.value = players.value.filter((player) => player.id !== Player.id);

    if (
      playersSumInGroup.value ===
      groups.value.length * GROUP_PLAYERS_NUMBER
    ) {
      saveBtnDisabled.value = false;
    }
  };

  const deletePlayers = (player, index) => {
    playersSumInGroup.value--;
    if (playersSumInGroup.value === 0) {
      useIsChanged().isChanged = false;
    }
    saveBtnDisabled.value = true;
    groups.value[index].players = groups.value[index].players.filter(
      (item) => item.id !== player.id
    );
    players.value.push(player);
  };
  const sendGroupsData = () => {
    let gData = [];
    for (const item of groups.value) {
      let obj = {};
      obj.group_id = item.group_id;
      for (const player of item.players) {
        obj.player_id = player.id;
        gData.push(obj);
      }
    }

    console.log(gData);
  };

  return {
    players,
    groups,
    saveBtnDisabled,
    deletePlayers,
    getPlayersAndGroups,
    addPlayerToGroup,
    sendGroupsData,
  };
};

export default setPlayers;

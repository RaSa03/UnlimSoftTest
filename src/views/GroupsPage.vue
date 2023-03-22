<template>
  <div class="card body-for-tables">
    <DataTable
      :value="players"
      @row-dblclick="addPlayerToGroup"
      tableStyle="min-width: 50vw"
      class="pointer"
    >
      <Column field="id" header="№" sortable style="width: 33%"></Column>
      <Column
        field="nameAndSurname"
        header="Участник"
        sortable
        style="width: 33%"
      ></Column>
      <Column
        field="birthday"
        header="Дата рождения"
        sortable
        style="width: 33%"
      ></Column>
    </DataTable>
    <div class="card groups">
      <Panel
        v-for="(item, index) in groups"
        :key="index"
        :header="'Группа ' + (index + 1)"
        class="mb20"
      >
        <div v-for="player in item.players" :key="player.id" class="list-item">
          <span @dblclick="deletePlayers(player, index)">
            {{ player.nameAndSurname }}</span
          >
        </div>
      </Panel>

      <Button
        @click="sendGroupsData"
        class="btn-right"
        label="Сохранить"
        text
        raised
        icon="pi pi-check"
        iconPos="right"
        :disabled="saveBtnDisabled"
      ></Button>
    </div>
  </div>
</template>

<script setup>
import Button from "primevue/button";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import { onMounted } from "vue";
import Panel from "primevue/panel";
import setPlayers from "@/components/сomposables/setPlayers";

const {
  players,
  groups,
  saveBtnDisabled,
  getPlayersAndGroups,
  addPlayerToGroup,
  deletePlayers,
  sendGroupsData,
} = setPlayers();

onMounted(() => {
  getPlayersAndGroups();
});
</script>
<style>
.spinner {
  width: 100vw;
  height: 70vh;
  justify-content: center;
  display: flex;
  flex-direction: column;
}
.body-for-tables {
  display: flex;
}
.groups {
  width: 100%;
  padding: 0 40px;
  display: flex;
  flex-direction: column;
}
.mb20 {
  margin-bottom: 20px;
}
.btn-right {
  align-self: flex-end;
}
.list-item {
  cursor: pointer;
  margin-bottom: 5px;
}
</style>

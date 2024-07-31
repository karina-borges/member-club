const main = document.querySelector("main");

const user = document.getElementById("user");
const recordList = document.getElementById("record-list");
const recordHeader = document.getElementById("record-header");
const cardId = document.getElementById("show-card-id");
const cardGrid = document.getElementById("card-grid");
const remainingCuts = document.getElementById("remaining-cuts");
const progressBarFill = document.getElementById("progress-bar-fill");
const progressLabel = document.getElementById("progress-label");

export function showClientInfo({ client }) {
  // Add user info to the DOM
  const name = document.createElement("h1");
  name.textContent = client.name;

  const clientSince = document.createElement("p");
  clientSince.textContent = `Cliente desde ${client.clientSince}`;

  user.append(name, clientSince);

  // Show record header
  const totalAppointments = document.createElement("p");
  totalAppointments.textContent = `${client.appointmentHistory.length} cortes`;

  recordHeader.append(totalAppointments);
  // Show record list of appointments
  client.appointmentHistory.forEach((record) => {
    const item = document.createElement("li");
    item.classList.add("record-item");

    const dateAndTime = document.createElement("div");
    dateAndTime.classList.add("date-time");

    const date = document.createElement("span");
    date.textContent = record.date;

    const time = document.createElement("p");
    time.textContent = record.time;

    const recordCheck = document.createElement("div");
    recordCheck.classList.add("record-check");

    const checkIcon = document.createElement("i");
    checkIcon.classList.add("ph", "ph-seal-check", "green");

    recordCheck.append(checkIcon);

    dateAndTime.append(date, time);

    item.append(dateAndTime, recordCheck);

    recordList.append(item);
  });

  const id = document.createElement("span");
  id.textContent = `id: ${client.id}`;
  cardId.appendChild(id);

  //Cria os itens conquistados
  for (let i = 0; i < client.loyaltyCard.totalCuts; i++) {
    const gridItem = document.createElement("div");
    gridItem.classList.add("grid-item");

    const img = document.createElement("img");
    img.src = "src/assets/pin-check.svg";
    img.alt = "Check icon";

    gridItem.append(img);

    cardGrid.append(gridItem);
  }

  //Criar os cards restantes até o penúltimo
  for (let i = 0; i < client.loyaltyCard.cutsRemaining - 1; i++) {
    const gridItem = document.createElement("div");
    gridItem.classList.add("grid-item");

    cardGrid.append(gridItem);
  }

  // Show the last child
  const gridItem = document.createElement("div");
  gridItem.classList.add("grid-item");

  const img = document.createElement("img");
  img.src = "src/assets/pin-gift.svg";
  img.alt = "Gift icon";

  if (client.loyaltyCard.cutsRemaining !== 0) {
    img.classList.add("opacity");
  }

  gridItem.append(img);

  cardGrid.append(gridItem);

  // Show the remaining cuts
  remainingCuts.textContent = client.loyaltyCard.cutsRemaining;

  // Show the progress bar with the correct width
  const cutsCompleted = client.loyaltyCard.totalCuts;
  const cutsNeeded = client.loyaltyCard.cutsNeeded;

  const progress = (cutsCompleted / cutsNeeded) * 100;

  progressBarFill.style.width = `${progress}%`;

  // Show the progress label
  progressLabel.textContent = `${cutsCompleted} de ${cutsNeeded}`;

  // Show the main element
  main.classList.remove("hidden");
}

const currentUser = JSON.parse(
  localStorage.getItem("azoomCurrentUser") || "null",
);

if (
  localStorage.getItem("azoomLoggedIn") !== "true" ||
  !currentUser ||
  currentUser.email !== "employer@azoom.com"
) {
  window.location.replace("index.html");
}

const reservationList = document.getElementById("reservationList");

let reservations = JSON.parse(
  localStorage.getItem("azoomReservations") || "[]",
);

// safety for what the user entered //
function escapeHTML(value) {
  return String(value ?? "").replace(/[&<>"']/g, function (char) {
    return {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    }[char];
  });
}

function money(value) {
  return Number(value).toFixed(2);
}

function renderReservations() {
  reservations = JSON.parse(localStorage.getItem("azoomReservations") || "[]");

  if (reservations.length === 0) {
    reservationList.innerHTML = `
                <div class="empty">
                    <h3>No reservations found</h3>
                    <p>Customer bookings will appear here.</p>
                </div>
            `;
    return;
  }

  reservationList.innerHTML = reservations
    .map(function (r) {
      const repairCost = Number(r.repairCost) || 0;
      const rentalPrice = Number(r.rentalPrice) || 0;
      const finalBill = rentalPrice + repairCost;

      return `
                <article class="reservation-card" data-id="${escapeHTML(r.id)}">

                    <div class="card-heading">
                        <div>
                            <h2>${escapeHTML(r.carModel)}</h2>
                            <span class="booking-id">
                                Booking ID: ${escapeHTML(r.id)}
                            </span>
                        </div>
                        <strong>${escapeHTML(r.status || "Rented")}</strong>
                    </div>

                    <div class="details">
                        <div class="detail">
                            <small>Customer</small>
                            ${escapeHTML(r.customerName)}
                        </div>

                        <div class="detail">
                            <small>Email</small>
                            ${escapeHTML(r.customerEmail)}
                        </div>

                        <div class="detail">
                            <small>Pickup Branch</small>
                            ${escapeHTML(r.pickupBranch)}
                        </div>

                        <div class="detail">
                            <small>Pickup Date</small>
                            ${escapeHTML(r.pickupDate)}
                        </div>

                        <div class="detail">
                            <small>Return Date</small>
                            ${escapeHTML(r.returnDate)}
                        </div>

                        <div class="detail">
                            <small>Rental Charge</small>
                            $${money(rentalPrice)}
                        </div>
                    </div>

                    <div class="management">
                        <label>
                            Vehicle Return Status
                            <select class="status">
                                <option value="Rented"
                                    ${r.status === "Rented" ? "selected" : ""}>
                                    Rented
                                </option>

                                <option value="Returned"
                                    ${r.status === "Returned" ? "selected" : ""}>
                                    Returned
                                </option>

                                <option value="Inspection Complete"
                                    ${r.status === "Inspection Complete" ? "selected" : ""}>
                                    Inspection Complete
                                </option>
                            </select>
                        </label>

                        <label>
                            Repair Cost ($)
                            <input
                                class="repair-cost"
                                type="number"
                                min="0"
                                step="0.01"
                                value="${repairCost}"
                            >
                        </label>

                        <label style="grid-column: 1 / -1;">
                            Damage Details / Inspection Notes
                            <textarea class="damage-notes"
                                placeholder="Describe any damage found, or write 'No damage found'."
                            >${escapeHTML(r.damageNotes || "")}</textarea>
                        </label>
                    </div>

                    <div class="bill">
                        <p>
                            <span>Rental Charge</span>
                            <span>$${money(rentalPrice)}</span>
                        </p>

                        <p>
                            <span>Repair Costs</span>
                            <span class="repair-display">$${money(repairCost)}</span>
                        </p>

                        <p class="total">
                            <span>Final Bill</span>
                            <span class="final-display">$${money(finalBill)}</span>
                        </p>
                    </div>

                    <button class="save">Save Updates</button>
                </article>
            `;
    })
    .join("");
}

// update the bill when entering damage //
reservationList.addEventListener("input", function (event) {
  if (!event.target.matches(".repair-cost")) return;

  const card = event.target.closest(".reservation-card");
  const rentalPrice =
    Number(reservations.find((r) => r.id === card.dataset.id)?.rentalPrice) ||
    0;

  const repairCost = Math.max(0, Number(event.target.value) || 0);

  card.querySelector(".repair-display").textContent = "$" + money(repairCost);

  card.querySelector(".final-display").textContent =
    "$" + money(rentalPrice + repairCost);
});

// save //
reservationList.addEventListener("click", function (event) {
  if (!event.target.matches(".save")) return;

  const card = event.target.closest(".reservation-card");
  const id = card.dataset.id;

  const reservation = reservations.find((r) => r.id === id);

  if (!reservation) return;

  const rawRepairCost = card.querySelector(".repair-cost").value;
  const repairCost = Number(rawRepairCost);

  if (
    rawRepairCost.trim() === "" ||
    !Number.isFinite(repairCost) ||
    repairCost < 0
  ) {
    alert("Please enter a valid repair cost of $0 or more.");
    return;
  }

  reservation.status = card.querySelector(".status").value;
  reservation.damageNotes = card.querySelector(".damage-notes").value.trim();

  reservation.repairCost = repairCost;
  reservation.finalBill = Number(reservation.rentalPrice) + repairCost;

  localStorage.setItem("azoomReservations", JSON.stringify(reservations));

  alert("Reservation and final bill saved successfully!");
  renderReservations();
});

document.getElementById("logoutBtn").addEventListener("click", function () {
  localStorage.removeItem("azoomLoggedIn");
  localStorage.removeItem("azoomCurrentUser");

  window.location.replace("index.html");
});

renderReservations();

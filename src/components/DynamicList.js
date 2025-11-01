// src/components/DynamicList.js
import React, { useEffect } from "react";
import $ from "jquery";

function DynamicList() {
  useEffect(() => {
    // Hide error initially
    $("#error").hide();

    // Add button click
    $("#addBtn").click(function () {
      const itemText = $("#itemInput").val().trim();

      if (itemText === "") {
        // Show error only when input is empty
        $("#error").fadeIn().delay(2000).fadeOut();
        return;
      }

      // Create list item
      const listItem = $("<li></li>")
        .addClass("d-flex justify-content-between align-items-center p-2 mb-2 bg-light rounded")
        .text(itemText);

      // Delete button
      const deleteBtn = $('<button class="btn btn-danger btn-sm">Delete</button>');
      deleteBtn.click(function () {
        $(this)
          .parent()
          .fadeOut(400, function () {
            $(this).remove();
          });
      });

      listItem.append(deleteBtn);
      $("#itemList").append(listItem);

      // Clear input
      $("#itemInput").val("");
    });

    // Enter key triggers Add button
    $("#itemInput").keypress(function (e) {
      if (e.which === 13) $("#addBtn").click();
    });
  }, []);
  return (
    <div className="dynamic-list-container w-75 mt-4">
      <h2>Dynamic List (jQuery)</h2>
      <div className="d-flex align-items-center mb-2 w-100">
        <div className="w-75">
          <input
            type="text"
            className="form-control w-100"
            id="itemInput"
            placeholder="Enter item..."
          />
        </div>
        <div className="w-25 ms-2 d-flex align-items-end justify-content-end">
          <button id="addBtn" className="btn btn-primary">
            Add Item
          </button>
        </div>
      </div>

      <ul id="itemList" className="list-unstyled"></ul>
    </div>
  );
}

export default DynamicList;

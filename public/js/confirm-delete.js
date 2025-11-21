function confirmDelete(event) {
  if (!confirm("Are you sure you want to delete this record?")) {
    event.preventDefault();
  }
}

$(document).ready(function() {
    $('#openModal').click(function() {
        $('#overlay, #modal').show();
        // $('#mainForm input').prop('disabled', true);
    });

    $('#closeModal').click(function() {
        const modalValues = $('#modalInput1').val() + ' ' +
            $('#modalInput2').val() + ' ' +
            $('#modalInput3').val() + ' ' +
            $('#modalInput4').val();

        $('#output').val(modalValues);
        $('#modal input').val('');
        $('#overlay, #modal').hide();
        $('#mainForm input').prop('disabled', false);
    });
});
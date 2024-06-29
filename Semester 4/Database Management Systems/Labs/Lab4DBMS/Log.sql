CREATE TABLE LogChanges(
	currentTime DATETIME,
	info VARCHAR(100),
	old_data VARCHAR(100),
	new_data VARCHAR(100),
	error VARCHAR(100)
)

GO
CREATE OR ALTER PROCEDURE sp_log_changes @oldData VARCHAR(100), @newData VARCHAR(100), @info VARCHAR(100), @error VARCHAR(100) AS
BEGIN
	INSERT INTO LogChanges (currentTime, info, old_data, new_data, error) VALUES
	(GETDATE(), @info, @oldData, @newData, @error)
END
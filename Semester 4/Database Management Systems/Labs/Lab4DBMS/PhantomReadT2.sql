--SET TRANSACTION ISOLATION LEVEL REPEATABLE READ
SET TRANSACTION ISOLATION LEVEL SERIALIZABLE -- solution
BEGIN TRAN
SELECT * FROM Fan
WAITFOR DELAY '00:00:05'
SELECT * FROM Fan
COMMIT TRAN
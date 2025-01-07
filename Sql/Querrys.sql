--Columna para validar si requiere re enviar correo a paciente
ALTER TABLE CompromisoVI
ADD EstadoEnviado INT DEFAULT 1;

-- EstadoEnviado = 0  
-- Requiere Enevio
-- EstadoEnviado = 1
-- NO Requiere Enevio


--Creacion de trigger para envio de recordatorio
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Fernando Ingeniero
-- Create date: 28 11 2024
-- Description:	Se crea para desarrollo de Envio de correo cuando se reagende una cita medica
-- =============================================
USE [Laureles]
GO
/****** Object:  Trigger [dbo].[Update Compromiso VI]    Script Date: 18/12/2024 9:05:15 a.m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Fernando Suarez>
-- Create date: <07/08/2014>
-- Description:	<Insertar la Cita>
-- =============================================
cREATE TRIGGER [dbo].[Update Compromiso VI] ON [dbo].[CompromisoVI]  
  FOR Update
AS 
BEGIN
	
	Declare @IdCompromisoVI int;
	Declare @EstadoEnviado int;

	
	select @IdCompromisoVI = [Id CompromisoVI] ,
	@EstadoEnviado = EstadoEnviado
	From inserted


	Set @EstadoEnviado = @EstadoEnviado +  1 ;
	UPDATE CompromisoVI SET EstadoEnviado = @EstadoEnviado
	WHERE   [Id CompromisoVI] = @IdCompromisoVI 

END
--!!!!!!!!!!!!!!!!!!!!!!FERCHO OJO ¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡

--  OJO FERCHO ESTE TRIGER NO FUNCIONA POR QUE CADA QUE HACES UNA CITA NUEVA CAMBIA EL ESTADO A 0
-- DEBER BUSCAR COMO HACER PARA IDENTIFICAR CUANDO SE INSERTO UNA CITA Y CUANDO SE ACTUALIZO 
--Recuerda quuitar el filtro para que se envie solo las del paciente administrador ceere 
CREATE VIEW [dbo].[Cnsta API CompromisoVI Insertador]
AS
SELECT        dbo.CompromisoVI.[Id CompromisoVI] AS IdCompromisoVI, dbo.CompromisoVI.EstadoEnviado, dbo.Entidad.[Documento Entidad] AS DocumentoPaciente, dbo.Entidad.[Nombre Completo Entidad] AS NombrePaciente, 
                         Entidad_1.[Documento Entidad] AS DocumentoProfesional, Entidad_1.[Nombre Completo Entidad] AS NombreProfesional, Entidad_1.[Observaciones Entidad] AS AliasProfesional, 
                         FORMAT(dbo.CompromisoVI.[Fecha Inicio CompromisoVI], 'yyyy/MM/dd') AS FechaInicio, FORMAT(dbo.CompromisoVI.[Fecha Fin CompromisoVI], 'yyyy/MM/dd') AS FechaFin, 
                         FORMAT(CAST(dbo.CompromisoVI.[Hora Inicio CompromisoVI] AS DATETIME), 'hh:mm tt') AS HoraInicio, FORMAT(CAST(dbo.CompromisoVI.[Hora Fin CompromisoVI] AS DATETIME), 'hh:mm tt') AS HoraFin, 
                         dbo.EntidadII.[E-mail Nro 1 EntidadII] AS CorreoPaciente, dbo.CompromisoVI.[Id Estado]
FROM            dbo.CompromisoVI INNER JOIN
                         dbo.Entidad AS Entidad_1 ON dbo.CompromisoVI.[Entidad Responsable] = Entidad_1.[Documento Entidad] INNER JOIN
                         dbo.Entidad ON dbo.CompromisoVI.[Entidad Atendida] = dbo.Entidad.[Documento Entidad] INNER JOIN
                         dbo.EntidadII ON dbo.CompromisoVI.[Entidad Atendida] = dbo.EntidadII.[Documento Entidad]
WHERE        (dbo.CompromisoVI.EstadoEnviado = 2) AND (dbo.CompromisoVI.[Fecha Inicio CompromisoVI] > GETDATE() - 1) AND (dbo.Entidad.[Documento Entidad] = N'70123456') AND (dbo.CompromisoVI.[Id Estado] = 58)
GO



CREATE VIEW [dbo].[Cnsta API CompromisoVI Actualizados]
AS
SELECT        dbo.CompromisoVI.[Id CompromisoVI] AS IdCompromisoVI, dbo.CompromisoVI.EstadoEnviado, dbo.Entidad.[Documento Entidad] AS DocumentoPaciente, dbo.Entidad.[Nombre Completo Entidad] AS NombrePaciente, 
                         Entidad_1.[Documento Entidad] AS DocumentoProfesional, Entidad_1.[Nombre Completo Entidad] AS NombreProfesional, Entidad_1.[Observaciones Entidad] AS AliasProfesional, 
                         FORMAT(dbo.CompromisoVI.[Fecha Inicio CompromisoVI], 'yyyy/MM/dd') AS FechaInicio, FORMAT(dbo.CompromisoVI.[Fecha Fin CompromisoVI], 'yyyy/MM/dd') AS FechaFin, 
                         FORMAT(CAST(dbo.CompromisoVI.[Hora Inicio CompromisoVI] AS DATETIME), 'hh:mm tt') AS HoraInicio, FORMAT(CAST(dbo.CompromisoVI.[Hora Fin CompromisoVI] AS DATETIME), 'hh:mm tt') AS HoraFin, 
                         dbo.EntidadII.[E-mail Nro 1 EntidadII] AS CorreoPaciente, dbo.CompromisoVI.[Id Estado]
FROM            dbo.CompromisoVI INNER JOIN
                         dbo.Entidad AS Entidad_1 ON dbo.CompromisoVI.[Entidad Responsable] = Entidad_1.[Documento Entidad] INNER JOIN
                         dbo.Entidad ON dbo.CompromisoVI.[Entidad Atendida] = dbo.Entidad.[Documento Entidad] INNER JOIN
                         dbo.EntidadII ON dbo.CompromisoVI.[Entidad Atendida] = dbo.EntidadII.[Documento Entidad]
WHERE        (dbo.CompromisoVI.EstadoEnviado >= 5) AND (dbo.CompromisoVI.[Fecha Inicio CompromisoVI] > GETDATE() - 1) AND (dbo.CompromisoVI.[Id Estado] = 58)
GO






CREATE VIEW [dbo].[Cnsta API CompromisoVI Cancelados]
AS
SELECT        dbo.CompromisoVI.[Id CompromisoVI] AS IdCompromisoVI, dbo.CompromisoVI.EstadoEnviado, dbo.Entidad.[Documento Entidad] AS DocumentoPaciente, dbo.Entidad.[Nombre Completo Entidad] AS NombrePaciente, 
                         Entidad_1.[Documento Entidad] AS DocumentoProfesional, Entidad_1.[Nombre Completo Entidad] AS NombreProfesional, Entidad_1.[Observaciones Entidad] AS AliasProfesional, 
                         FORMAT(dbo.CompromisoVI.[Fecha Inicio CompromisoVI], 'yyyy/MM/dd') AS FechaInicio, FORMAT(dbo.CompromisoVI.[Fecha Fin CompromisoVI], 'yyyy/MM/dd') AS FechaFin, 
                         FORMAT(CAST(dbo.CompromisoVI.[Hora Inicio CompromisoVI] AS DATETIME), 'hh:mm tt') AS HoraInicio, FORMAT(CAST(dbo.CompromisoVI.[Hora Fin CompromisoVI] AS DATETIME), 'hh:mm tt') AS HoraFin, 
                         dbo.EntidadII.[E-mail Nro 1 EntidadII] AS CorreoPaciente, dbo.CompromisoVI.[Id Estado]
FROM            dbo.CompromisoVI INNER JOIN
                         dbo.Entidad AS Entidad_1 ON dbo.CompromisoVI.[Entidad Responsable] = Entidad_1.[Documento Entidad] INNER JOIN
                         dbo.Entidad ON dbo.CompromisoVI.[Entidad Atendida] = dbo.Entidad.[Documento Entidad] INNER JOIN
                         dbo.EntidadII ON dbo.CompromisoVI.[Entidad Atendida] = dbo.EntidadII.[Documento Entidad]
WHERE        (dbo.CompromisoVI.EstadoEnviado >= 4) AND (dbo.CompromisoVI.[Fecha Inicio CompromisoVI] > GETDATE() - 1) AND (dbo.CompromisoVI.[Id Estado] = 60 OR
                         dbo.CompromisoVI.[Id Estado] = 61 OR
                         dbo.CompromisoVI.[Id Estado] = 64)
GO


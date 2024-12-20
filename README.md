# frontend

Angular application getting data via REST and Signalr.

# backend

C# WebAPI providing data via REST controller and Signalr hub. It contains a ServiceBusProcessor receiving data from an Azure service bus.

# servicebus_emulator

- emulator: docker-compose.yaml which contains configuration for an Azure service bus emulator running locally.
- sbapp_sender: C# console application with a ServiceBusSender to send messages to an Azure service bus.
- sbapp_receiver: C# console application with a ServiceBusProcessor to process messages from an Azure service bus.

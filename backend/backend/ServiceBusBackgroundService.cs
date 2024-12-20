namespace backend
{
    public class ServiceBusBackgroundService : IHostedService
    {
        private readonly ServiceBusConnector _serviceBusConnector;
        public ServiceBusBackgroundService(ServiceBusConnector serviceBusConnector)
        {
            _serviceBusConnector = serviceBusConnector;
        }
        public Task StartAsync(CancellationToken cancellationToken)
        {
            return _serviceBusConnector.StartProcessingAsync();
        }
        public Task StopAsync(CancellationToken cancellationToken)
        {
            return _serviceBusConnector.StopProcessingAsync();
        }
    }
}

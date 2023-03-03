using Microsoft.AspNetCore.Mvc.Filters;

namespace back_end.filtros
{
    public class FiltroDeExcepcion: ExceptionFilterAttribute
    {
        private ILogger<FiltroDeExcepcion> logger;

        public FiltroDeExcepcion(ILogger<FiltroDeExcepcion> logger)
        {
            this.logger = logger;
        }

        public override void OnException(ExceptionContext context)
        {
            logger.LogError(context.Exception, context.Exception.Message);
            base.OnException(context);
        }
    }
}

import ssl
import smtplib
from django.core.mail.backends.smtp import EmailBackend as DjangoSMTPBackend

class CustomEmailBackend(DjangoSMTPBackend):
    """
    Custom email backend that handles SSL certificate issues
    """
    
    def __init__(self, host=None, port=None, username=None, password=None,
                 use_tls=None, fail_silently=None, use_ssl=None, timeout=None,
                 ssl_keyfile=None, ssl_certfile=None, **kwargs):
        # Call the parent constructor to initialize all attributes
        super().__init__(
            host=host, port=port, username=username, password=password,
            use_tls=use_tls, fail_silently=fail_silently, use_ssl=use_ssl,
            timeout=timeout, ssl_keyfile=ssl_keyfile, ssl_certfile=ssl_certfile,
            **kwargs
        )
    
    def open(self):
        """
        Ensure an open connection to the email server with custom SSL handling.
        """
        if self.connection:
            # Nothing to do if the connection is already open.
            return False

        # Connection parameters
        connection_params = {}
        if hasattr(self, 'local_hostname') and self.local_hostname:
            connection_params['local_hostname'] = self.local_hostname
        if self.timeout is not None:
            connection_params['timeout'] = self.timeout
        if hasattr(self, 'source_address') and self.source_address is not None:
            connection_params['source_address'] = self.source_address

        try:
            self.connection = self.connection_class(
                self.host, self.port, **connection_params
            )

            # Handle TLS/SSL with custom context
            if self.use_tls:
                # Create SSL context that ignores certificate verification for development
                context = ssl.create_default_context()
                context.check_hostname = False
                context.verify_mode = ssl.CERT_NONE
                
                # Start TLS with custom context
                self.connection.starttls(context=context)
            
            # Login if credentials are provided
            if self.username and self.password:
                self.connection.login(self.username, self.password)
            
            return True
            
        except (smtplib.SMTPException, OSError):
            if not self.fail_silently:
                raise
            return False
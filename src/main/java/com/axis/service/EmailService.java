package com.axis.service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;


@Service
@Slf4j
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private TemplateEngine templateEngine;

    @Value("${app.mail.from}")
    private String emailFrom;

    @Value("${app.mail.fromName}")
    private String emailFromName;

    
    public void enviarEmailResetSenha(String emailDestino, String nomeUsuario, String token, String urlFrontend)
            throws MessagingException {

        try {
            log.info("Iniciando envio de email de reset de senha para: {}", emailDestino);

            
            String urlReset = urlFrontend + "?token=" + token;

            
            Context context = new Context();
            context.setVariable("nomeUsuario", nomeUsuario);
            context.setVariable("urlReset", urlReset);
            context.setVariable("validadeMinutos", 15);

            
            String htmlContent = templateEngine.process("email-reset-senha", context);

            
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            helper.setFrom(emailFrom, emailFromName);
            helper.setTo(emailDestino);
            helper.setSubject("AXIS - Redefinição de Senha");
            helper.setText(htmlContent, true);

            
            mailSender.send(message);

            log.info("Email de reset de senha enviado com sucesso para: {}", emailDestino);

        } catch (Exception e) {
            log.error("Erro ao enviar email de reset de senha para {}: {}", emailDestino, e.getMessage(), e);
            throw new MessagingException("Erro ao enviar email de reset de senha", e);
        }
    }

    
    public void enviarEmailConfirmacaoAlteracaoSenha(String emailDestino, String nomeUsuario)
            throws MessagingException {

        try {
            log.info("Iniciando envio de email de confirmação de alteração de senha para: {}", emailDestino);

            
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            helper.setFrom(emailFrom, emailFromName);
            helper.setTo(emailDestino);
            helper.setSubject("AXIS - Senha Alterada com Sucesso");

            String conteudo = String.format("""
                <html>
                <body style="font-family: Arial, sans-serif; padding: 20px;">
                    <h2 style="color: #667eea;">Senha Alterada com Sucesso</h2>
                    <p>Olá, <strong>%s</strong>!</p>
                    <p>Sua senha foi alterada com sucesso em <strong>%s</strong>.</p>
                    <p>Se você não realizou esta alteração, entre em contato conosco imediatamente.</p>
                    <br>
                    <p style="color: #777;">Atenciosamente,<br>Equipe AXIS</p>
                </body>
                </html>
                """, nomeUsuario, java.time.LocalDateTime.now().format(java.time.format.DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm")));

            helper.setText(conteudo, true);

            
            mailSender.send(message);

            log.info("Email de confirmação de alteração de senha enviado com sucesso para: {}", emailDestino);

        } catch (Exception e) {
            log.error("Erro ao enviar email de confirmação para {}: {}", emailDestino, e.getMessage(), e);
            throw new MessagingException("Erro ao enviar email de confirmação", e);
        }
    }

    
    public void enviarEmailAprovacao(String emailDestino, String nomeTerapeuta, String urlLogin)
            throws MessagingException {

        try {
            log.info("Iniciando envio de email de aprovação para: {}", emailDestino);

            
            Context context = new Context();
            context.setVariable("nomeTerapeuta", nomeTerapeuta);
            context.setVariable("urlLogin", urlLogin);

            
            String htmlContent = templateEngine.process("email-terapeuta-aprovado", context);

            
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            helper.setFrom(emailFrom, emailFromName);
            helper.setTo(emailDestino);
            helper.setSubject("AXIS - Seu Cadastro foi Aprovado!");
            helper.setText(htmlContent, true);

            
            mailSender.send(message);

            log.info("Email de aprovação enviado com sucesso para: {}", emailDestino);

        } catch (Exception e) {
            log.error("Erro ao enviar email de aprovação para {}: {}", emailDestino, e.getMessage(), e);
            throw new MessagingException("Erro ao enviar email de aprovação", e);
        }
    }

    
    public void enviarEmailReprovacao(String emailDestino, String nomeTerapeuta, String motivoReprovacao, String urlSuporte)
            throws MessagingException {

        try {
            log.info("Iniciando envio de email de reprovação para: {}", emailDestino);

            
            Context context = new Context();
            context.setVariable("nomeTerapeuta", nomeTerapeuta);
            context.setVariable("motivoReprovacao", motivoReprovacao);
            context.setVariable("urlSuporte", urlSuporte);

            
            String htmlContent = templateEngine.process("email-terapeuta-reprovado", context);

            
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            helper.setFrom(emailFrom, emailFromName);
            helper.setTo(emailDestino);
            helper.setSubject("AXIS - Atualização sobre seu Cadastro");
            helper.setText(htmlContent, true);

            
            mailSender.send(message);

            log.info("Email de reprovação enviado com sucesso para: {}", emailDestino);

        } catch (Exception e) {
            log.error("Erro ao enviar email de reprovação para {}: {}", emailDestino, e.getMessage(), e);
            throw new MessagingException("Erro ao enviar email de reprovação", e);
        }
    }
}

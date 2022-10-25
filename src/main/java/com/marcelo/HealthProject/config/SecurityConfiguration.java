package com.marcelo.HealthProject.config;

import java.io.IOException;
import java.util.logging.Logger;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;

import com.marcelo.HealthProject.entity.User;
import com.marcelo.HealthProject.service.UserService;

@Configuration
@EnableWebSecurity
public class SecurityConfiguration {
	
	private Logger logger = Logger.getLogger(getClass().getName());

    @Autowired
    private UserService userService;
	
	protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.authenticationProvider(authenticationProvider());
    }
	
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
    		
        return http		
				.authorizeRequests(configurer ->
					configurer
						.antMatchers("/images/**").permitAll()
						.antMatchers("/scripts/**").permitAll()
						.antMatchers("/stylesheets/**").permitAll()
						.antMatchers("/").hasAnyRole("USER","SUPPORT","ADMIN")
						.antMatchers("/users/**").hasAnyRole("SUPPORT","ADMIN")
						.antMatchers("/support/**").hasRole("ADMIN")
				)
				.formLogin(configurer ->
					configurer
						.loginPage("/showLoginPage")
						.loginProcessingUrl("/authenticateUser")
						.successHandler(new AuthenticationSuccessHandler() {
							
							@Override
							public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
									Authentication authentication) throws IOException, ServletException {
								
								logger.info("In customAuthenticationSuccessHandler");

								String username = authentication.getName();
								
								logger.info("userName=" + username);

								User user = userService.findByUsername(username);
								
								HttpSession session = request.getSession();
								session.setAttribute("user", user);
								
								response.sendRedirect(request.getContextPath() + "/supplements");
							}
						})
						.permitAll()
				)
				.logout(configurer -> 
					configurer
						.permitAll()
				)
				.exceptionHandling(configurer ->
					configurer
						.accessDeniedPage("/accessDenied")
				)
				.build();  
    }
    
	@Bean
	public BCryptPasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}
	
	@Bean
	public DaoAuthenticationProvider authenticationProvider() {
		DaoAuthenticationProvider auth = new DaoAuthenticationProvider();
		auth.setUserDetailsService(userService); //set the custom user details service
		auth.setPasswordEncoder(passwordEncoder()); //set the password encoder - bcrypt
		return auth;
	}
}

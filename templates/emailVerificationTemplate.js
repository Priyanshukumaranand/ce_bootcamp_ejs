const otpTemplate = (otp) => {
	return `<!DOCTYPE html>
	<html>
	
	<head>
		<meta charset="UTF-8">
		<title>OTP Verification Email</title>
		
	
	</head>
	
	<body>
		<div class="container">
			
				<h2 class="highlight">${otp}</h2>
				
	</body>
	
	</html>`;
};
module.exports = otpTemplate;
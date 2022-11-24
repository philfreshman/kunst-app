package middleware

import (
	"github.com/gin-gonic/gin"
)

func VerifyJWT() gin.HandlerFunc {

	type AuthScope struct {
		UserID int
	}

	return func(c *gin.Context) {
		//
		//authHeader := c.GetHeader("Authorization")
		//
		//if len(authHeader) == 0 {
		//	c.AbortWithStatusJSON(http.StatusForbidden, gin.H{"status": "failed", "error": "no authorization header present", "data": nil})
		//	c.Abort()
		//	return
		//}
		//
		//tokenString := authHeader[len("Bearer "):]
		//
		//_, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		//	if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
		//		return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
		//	}
		//	return []byte(config.Config("AUTH_TOKEN_SECRET")), nil
		//})
		//
		//if err != nil {
		//	c.AbortWithStatusJSON(http.StatusForbidden, gin.H{"status": "failed", "error": "jwt token not valid", "data": nil})
		//	c.Abort()
		//	return
		//}

		c.Next()
	}
}

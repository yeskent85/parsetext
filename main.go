package main

import (
	"github.com/devgod1007/parsetext/src/backend/controllers"
	"github.com/gin-gonic/contrib/static"
	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()

	// Serve frontend static files
	router.Use(static.Serve("/", static.LocalFile("./src/views", true)))
	// Routes
	router.POST("/book_text", controllers.BookByText)

	router.NoRoute(func(c *gin.Context) {
		c.JSON(404, gin.H{"code": "PAGE_NOT_FOUND", "message": "Page not found"})
	})

	// Run the server
	router.Run()
}

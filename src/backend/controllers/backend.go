package controllers

import (
	"fmt"
	"net/http"

	"github.com/devgod1007/parsetext/src/parser"

	"github.com/gin-gonic/gin"
)

// POST /book_text
// post book by text
func BookByText(c *gin.Context) {
	// Validate input
	text := c.PostForm("book_text")
	fmt.Println(text)

	topTenWords := parser.ParseText(text)
	c.JSON(http.StatusOK, topTenWords)
}

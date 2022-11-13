for i in {1..25}
do
    if [ $i -lt 10 ]
    then
        name="day0$i"
        mkdir "$name"
        cd "$name"
        touch "$name.go"
        echo "package $name" >> "$name.go"
        echo "" >> "$name.go"
        echo "import (" >> "$name.go"
        echo "    \"fmt\"" >> "$name.go"
        echo ")" >> "$name.go"
        echo "" >> "$name.go"
        echo "func Solution() {" >> "$name.go"
        echo "    fmt.Println(\"AOC $name\")" >> "$name.go"
        echo "}" >> "$name.go"
        echo "Created $name"
        cd ..
    else
        name="day$i"
        mkdir "$name"
        cd "$name"
        touch "$name.go"
        echo "package $name" >> "$name.go"
        echo "" >> "$name.go"
        echo "import (" >> "$name.go"
        echo "    \"fmt\"" >> "$name.go"
        echo ")" >> "$name.go"
        echo "" >> "$name.go"
        echo "func Solution() {" >> "$name.go"
        echo "    fmt.Println(\"AOC $name\")" >> "$name.go"
        echo "}" >> "$name.go"
        echo "Created $name"
        cd ..
    fi
done
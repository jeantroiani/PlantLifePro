import { Elysia, t } from 'elysia'

class Note {
    constructor(public data: string[] = ['Moonhalo']) {}

    add(note: string) { 
        this.data.push(note) 

        return this.data 
    } 

    remove(index: number) { 
        this.data.splice(index, 1) 

        return this.data 
    }

    update(index: number, note: string) { 
        this.data[index] = note 

        return this.data 
    }
}

export const note = new Elysia()
    .decorate('note', new Note())
    .get('/note', ({ note }) => note.data)
    .get(
        '/note/:index',
        ({ note, params: { index }, error }) => {
            return note.data[index] ?? error(404, 'oh no :(')
        },
        {
            params: t.Object({
                index: t.Number()
            })
        }
    )
    .put('/note', ({ note, body: { note: newNote } }) => note.add(newNote),
    {
        body: t.Object({
            note: t.String()
        })  
    })
    .delete('/note/:index', ({ note, params: { index } }) => note.remove(index),
    {
        params: t.Object({
            index: t.Number()
        })
    })
    .patch('/note/:index', 
        ({ note, params: { index }, body: { data }, error }) => {
            if (index in note.data) return note.update(index, data)
                return error(404, 'oh no :(')
        }, {
            params: t.Object({
                index: t.Number()
            }),
            body: t.Object({
                data: t.String()
            })
        }
    )